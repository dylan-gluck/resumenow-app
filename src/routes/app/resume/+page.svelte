<script lang="ts">
	import type { PageData } from './$types';
	import ResumeForm from '@/components/resume-form/ResumeForm.svelte';

	let { data }: { data: PageData } = $props();

	let isImporting = false;
	let resumeImport = {};
</script>

<svelte:head>
	<title>Edit Resume | ResumeNow</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-4 text-center">
			<h2 class="text-4xl font-bold leading-none">Edit Resume</h2>
			<p class="mt-4 max-w-[60ch] text-lg text-muted-foreground">
				Contact info, education history, work experience, skills, and certifications. This info will
				be used to generate a custom resume for each position you apply for.
			</p>
		</div>
	</div>
	<div class="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-tl-xl rounded-tr-xl border border-b-0 border-border p-12">
			<ResumeForm {data} {resumeImport} {isImporting} />
		</div>
	</div>
</div>
