<script lang="ts">
	import { Separator } from '@/components/ui/separator';
	import ResumeUpload from './ResumeUpload.svelte';
	import LinkedinImport from './LinkedinImport.svelte';
	import ResumeForm from '@/components/resume-form/ResumeForm.svelte';
	import type { PageData } from './$types';
	import type { Resume } from '@/types/resume';

	let { data }: { data: PageData } = $props();

	let isImporting: boolean = $state(false);
	let resumeImport: Resume = $state<Resume>({});
</script>

<svelte:head>
	<title>Onboarding | Svelte Saas Starter</title>
</svelte:head>

<div class="py-12">
	<div class="container">
		<h2 class="text-4xl font-bold leading-none">Onboarding</h2>
		<p class="mt-4 max-w-[60ch] text-lg text-muted-foreground">
			Let's get started! Upload your current resume or enter your work experience below. This info
			will be used as a base for each resume you generate.
		</p>

		<div class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
			<div class="flex flex-col gap-4">
				<ResumeUpload bind:resumeImport bind:isImporting />
				<div class="my-4 flex items-center justify-center gap-4">
					<Separator class="flex-1" />
					<span class="flex-none text-xs text-muted-foreground">OR</span>
					<Separator class="flex-1" />
				</div>
				<LinkedinImport />
			</div>
			<ResumeForm {data} {resumeImport} {isImporting} />
		</div>
	</div>
</div>
