<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '@/components/ui/button/index.js';
	import { Input } from '@/components/ui/input';
	import type { Job } from '@/types/job';
	import { CircleDollarSign, Loader, MapPin } from '@lucide/svelte';

	let { data } = $props();

	let user = $derived(data.user);
	let supabase = $derived(data.supabase);

	let url = $state('');
	let processing = $state(false);
	let jobData: Job | null = $state(null);
	let positionId: string | null = $state(null);

	$effect(() => {
		if (url) {
			handleURLChange();
		}
	});
	$effect(() => {
		if (jobData) {
			handleJobData();
		}
	});
	$effect(() => {
		if (positionId) {
			goto(`/app/positions/${positionId}`);
		}
	});

	async function handleURLChange() {
		if (!user) return;
		if (!url) return;

		processing = true;

		const urlRegex =
			/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
		if (!urlRegex.test(url)) {
			console.log('Invalid url');
			processing = false;
			return;
		}

		const { data: position } = await supabase
			.from('positions')
			.select()
			.eq('user_id', user.id)
			.eq('job_url', url)
			.single();

		if (position) {
			positionId = position.id;
			return;
		}

		if (!position) {
			const formData = new FormData();
			formData.append('url', url);

			try {
				const response = await fetch('http://127.0.0.1:8000/job', {
					method: 'PUT',
					body: formData,
					headers: {
						Accept: 'application/json'
					},
					credentials: 'include'
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();

				if (result.data && result.data.job) {
					jobData = result.data.job;
				}
			} catch (error) {
				console.error('Error getting job info:', error);
				alert(`Error getting job info. Please try again. ${error}`);
			} finally {
				processing = false;
			}
		}
	}

	async function handleJobData() {
		if (!user) return;
		if (!jobData) return;

		const { data, error } = await supabase
			.from('positions')
			.insert([
				{
					user_id: user.id,
					company: jobData.company,
					title: jobData.title,
					job_url: jobData.link,
					job_data: jobData
				}
			])
			.select();

		if (error) {
			console.error('Error creating job in database:', error);
		}

		if (data) {
			positionId = data[0].id;
		}
	}
</script>

<svelte:head>
	<title>Apply | ResumeNow</title>
</svelte:head>

<div class="grid flex-1 place-items-center">
	{#if !processing}
		<div class="container mb-[200px] text-center">
			<h1 class="text-4xl font-bold leading-none">Apply to Position</h1>
			<p class="mx-auto mt-4 max-w-[60ch] text-lg text-muted-foreground">
				Enter the url of the job posting below to automatically pull in the description and generate
				a custom resume, or enter the information manually.
			</p>
			<div class="mx-auto mt-8 flex max-w-2xl items-center gap-2">
				<Input bind:value={url} type="text" placeholder="https://..." />
			</div>
		</div>
	{/if}
	{#if processing}
		<div class="container mb-[200px] text-center">
			<h1 class="text-4xl font-bold leading-none">Hang Tight...</h1>
			<p class="mx-auto mt-4 max-w-[60ch] text-lg text-muted-foreground">
				We're fetching the job details for you. This might take a moment.
			</p>
			<div class="mt-8 grid place-items-center">
				<Loader class="animate-spin text-muted-foreground" />
			</div>
		</div>
	{/if}
</div>
