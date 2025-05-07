<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button } from '@/components/ui/button';
	import { Upload, FileUp, X } from 'lucide-svelte';
	import type { Resume } from '@/types/resume';

	let {
		resumeImport = $bindable(),
		isImporting = $bindable()
	}: { resumeImport: Resume | undefined; isImporting: boolean } = $props();

	let fileInput: HTMLInputElement;
	let isDragging = $state(false);
	let fileName = $state('');

	const acceptedFileTypes = '.pdf, .md, .txt, .doc, .docx';

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;

		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const fileExtension = file.name.split('.').pop()?.toLowerCase();
			const validTypes = acceptedFileTypes.split(', ').map((type) => type.replace('.', ''));

			if (fileExtension && validTypes.includes(fileExtension)) {
				handleFileUpload(file);
			} else {
				alert(`Invalid file type. Please upload: ${acceptedFileTypes}`);
			}
		}
	}

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			handleFileUpload(files[0]);
		}
	}

	async function handleFileUpload(file: File) {
		fileName = file.name;
		isImporting = true;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch(`${PUBLIC_API_URL}/parse`, {
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
			} else if (result.resume) {
				// Alternative response structure
				resumeImport = result.resume;
			}
		} catch (error) {
			console.error('Error uploading resume:', error);
			alert('Failed to upload or parse resume. Please try again.');
		} finally {
			isImporting = false;
		}
	}

	function clearFile() {
		fileName = '';
		if (fileInput) {
			fileInput.value = '';
		}
	}

	function openFileDialog() {
		if (fileInput) {
			fileInput.click();
		}
	}
</script>

<h3 class="text-lg font-semibold">Upload Resume</h3>
<input
	type="file"
	accept={acceptedFileTypes}
	class="hidden"
	bind:this={fileInput}
	onchange={handleFileChange}
/>

{#if fileName}
	<div class="flex gap-2">
		<div
			class="flex w-full items-center justify-between rounded-md border border-border bg-background p-2"
		>
			<div class="flex items-center gap-2">
				<FileUp class="h-5 w-5 text-primary" />
				<span class="text-sm font-medium">{fileName}</span>
			</div>
		</div>
		<Button variant="outline" onclick={clearFile} disabled={isImporting}>
			<X />
		</Button>
	</div>
{:else}
	<button
		class="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-md border border-dashed
		{isDragging
			? 'border-primary bg-primary/5'
			: 'border-gray-300'} cursor-pointer p-4 transition-colors hover:border-primary hover:bg-primary/5"
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
		onclick={openFileDialog}
		type="button"
		disabled={isImporting}
	>
		<Upload class="h-8 w-8 text-primary/80" />
		<div class="text-center">
			<span class="text-muted-foreground">Drag and drop your document here</span>
			<p class="text-xs text-muted-foreground">or click to browse your files</p>
			<p class="mt-1 text-xs text-muted-foreground">File types accepted: pdf, doc, docx, txt, md</p>
		</div>
	</button>
{/if}
