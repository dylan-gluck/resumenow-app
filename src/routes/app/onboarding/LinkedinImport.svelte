<script lang="ts">
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import type { Resume } from '@/types/resume';
	import { PUBLIC_API_URL } from '$env/static/public';

	let {
		resumeImport = $bindable(),
		isImporting = $bindable()
	}: { resumeImport: Resume | undefined; isImporting: boolean } = $props();

	let url = $state('');

	async function handleSubmit() {
		if (!url) return;

		isImporting = true;

		const formData = new FormData();
		formData.append('url', url);

		try {
			const response = await fetch(`${PUBLIC_API_URL}/linkedin`, {
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

			if (result.data && result.data.resume) {
				resumeImport = result.data.resume;
			}
		} catch (error) {
			console.error('Error uploading resume:', error);
			alert('Failed to upload or parse resume. Please try again.');
		} finally {
			isImporting = false;
		}
	}
</script>

<h3 class="text-lg font-semibold">LinkedIn Import</h3>
<div class="flex w-full items-center space-x-2">
	<Input
		type="text"
		placeholder="https://www.linkedin.com/in/..."
		bind:value={url}
		disabled={isImporting}
	/>
	<Button type="button" variant="outline" onclick={handleSubmit} disabled={isImporting}
		>Fetch Profile</Button
	>
</div>
