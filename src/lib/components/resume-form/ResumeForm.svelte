<script lang="ts">
	import * as Accordion from '@/components/ui/accordion';
	import * as Form from '@/components/ui/form';
	import { Loader } from '@lucide/svelte';
	import { Button } from '@/components/ui/button';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Resume } from '@/types/resume';

	// Import section components
	import {
		ContactSection,
		SummarySection,
		EducationSection,
		WorkExperienceSection,
		SkillsSection,
		ProjectsSection,
		OpenSourceContributionsSection,
		CertificationsSection,
		AdditionalInfoSection
	} from './sections';

	let {
		data,
		resumeImport,
		isImporting
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
		resumeImport: Resume | undefined;
		isImporting: boolean;
	} = $props();

	let isSaving = $state(false);

	// Enhanced form setup with better event handling
	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		resetForm: false,
		onSubmit: () => {
			isSaving = true;
		},
		onUpdated: () => {
			isSaving = false;
		}
	});

	const { form: formData, errors: formErrors, enhance } = form;

	$effect(() => {
		// If resumeImport changes and is not empty, update form data with data from resumeImport
		if (resumeImport !== undefined) {
			console.log('Updating form data with resumeImport:', resumeImport);
			$formData = resumeImport;
		}
	});
</script>

<!-- <SuperDebug data={formData} />
<SuperDebug data={formErrors} /> -->

<form
	method="POST"
	action="?/save"
	class="relative flex flex-col gap-4 px-2 lg:col-span-2"
	use:enhance
>
	{#if isImporting}
		<div
			class="absolute inset-0 z-10 m-auto flex cursor-wait flex-col items-center justify-center gap-3 bg-background/50 backdrop-blur-sm"
		>
			<Loader class="animate-spin" />
			<span class="max-w-[25ch] text-center text-sm font-medium"
				>Extracting your info, this could take a few minutes.</span
			>
		</div>
	{/if}

	<Accordion.Root type="multiple">
		<!-- Contact Information -->
		<ContactSection {form} {formData} />

		<!-- Summary -->
		<SummarySection {form} {formData} />

		<!-- Education -->
		<EducationSection {form} {formData} />

		<!-- Work Experience -->
		<WorkExperienceSection {form} {formData} />

		<!-- Technical Skills -->
		<SkillsSection {form} {formData} />

		<!-- Projects -->
		<ProjectsSection {form} {formData} />

		<!-- Open Source Contributions -->
		<OpenSourceContributionsSection {form} {formData} />

		<!-- Certifications -->
		<CertificationsSection {form} {formData} />

		<!-- Additional Information -->
		<AdditionalInfoSection {form} {formData} />
	</Accordion.Root>

	<div class="mt-8 flex justify-end gap-2 py-4">
		{#if isSaving}
			<Button variant="outline" disabled><Loader class="animate-spin" /> Saving...</Button>
		{:else}
			<Form.Button type="submit">Save Resume</Form.Button>
		{/if}
	</div>
</form>
