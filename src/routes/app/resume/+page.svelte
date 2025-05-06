<script lang="ts">
	import type { PageData } from './$types';
	import ResumeForm from '@/components/resume-form/ResumeForm.svelte';

	let { data }: { data: PageData } = $props();

	let isImporting = false;
	let resumeImport = {};
</script>

<svelte:head>
	<title>Edit Resume | Svelte Saas Starter</title>
</svelte:head>

<div class="py-12">
	<div class="container">
		<h2 class="text-4xl font-bold leading-none">Base Resume</h2>
		<p class="mt-4 max-w-[60ch] text-lg text-muted-foreground">
			Contact info, education history, work experience, skills, and certifications. This info will
			be used as a base for each resume you generate.
		</p>

		<div class="mt-12 grid grid-cols-1 gap-12">
			<ResumeForm {data} {resumeImport} {isImporting} />
		</div>
	</div>
</div>
