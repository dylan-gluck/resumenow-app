<script lang="ts">
	import { Separator } from '@/components/ui/separator';
	import ResumeUpload from './ResumeUpload.svelte';
	import LinkedinImport from './LinkedinImport.svelte';
	import ResumeForm from '@/components/resume-form/ResumeForm.svelte';
	import type { PageData } from './$types';
	import type { Resume } from '@/types/resume';

	let { data }: { data: PageData } = $props();

	let isImporting: boolean = $state(false);
	let resumeImport: Resume | undefined = $state(undefined);
</script>

<svelte:head>
	<title>Onboarding | ResumeNow</title>
</svelte:head>

<div class="py-12">
	<div class="container">
		<h2 class="text-center text-4xl font-bold leading-none">Let's get started!</h2>
		<p class="mx-auto mt-4 max-w-[60ch] text-center text-lg text-muted-foreground">
			Upload your current resume or enter your work experience below. This info will be used as a
			base for each resume you generate.
		</p>

		<div class="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
			<div class="flex flex-col gap-4">
				<ResumeUpload bind:resumeImport bind:isImporting />
				<div class="my-4 flex items-center justify-center gap-4">
					<Separator class="flex-1" />
					<span class="flex-none text-xs text-muted-foreground">OR</span>
					<Separator class="flex-1" />
				</div>
				<LinkedinImport bind:resumeImport bind:isImporting />
			</div>
			<ResumeForm {data} {resumeImport} {isImporting} />
		</div>
	</div>
</div>
