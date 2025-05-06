<script lang="ts">
	import { Input } from '@/components/ui/input';
	import type { Job } from '@/types/job';
	import { Loader } from '@lucide/svelte';

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

	async function handleJobData() {
		if (!jobData) return;

		const { data, error } = await supabase
			.from('resumes')
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

	async function handleURLChange() {
		processing = true;

		const urlRegex = /^(https?:\/\/)?([\da-z\.]+)\.([a-z\.]+)([\/\w\.\-?~&%=\(\)!\.\+\:\,\'#]*)$/;
		if (url && urlRegex.test(url)) {
			processing = false;
			return;
		}

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
</script>

<svelte:head>
	<title>Apply | Svelte Saas Starter</title>
</svelte:head>

{#if !jobData}
	<div class="grid flex-1 place-items-center">
		{#if !processing}
			<div class="container mb-[200px] text-center">
				<h1 class="text-4xl font-bold leading-none">Apply to Position</h1>
				<p class="mx-auto mt-4 max-w-[60ch] text-lg text-muted-foreground">
					Enter the url of the job posting below to automatically pull in the description and
					generate a custom resume, or enter the information manually.
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
{/if}
{#if jobData}
	<div class="flex flex-col">
		<div class="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
			<span>{jobData.company}</span>
			<h2 class="text-3xl font-bold">{jobData.title}</h2>
		</div>
		<div class="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
			<p>{JSON.stringify(jobData)}</p>
		</div>
	</div>
{/if}
