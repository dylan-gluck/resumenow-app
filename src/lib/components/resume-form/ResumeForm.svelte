<script lang="ts">
	import * as Form from '@/components/ui/form';
	import * as Table from '$lib/components/ui/table';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Accordion from '@/components/ui/accordion';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Textarea } from '@/components/ui/textarea';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { Switch } from '@/components/ui/switch';
	import { Loader } from '@lucide/svelte';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		type Education,
		type WorkExperience,
		type Skill,
		type Project,
		type OpenSourceContribution,
		type Certification,
		type Resume
	} from '@/types/resume';
	import SuperDebug from 'sveltekit-superforms';

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
		// If resumeImport changes and is not empty, update $formData with data from resumeImport
		if (resumeImport !== undefined) {
			console.log('Updating form data with resumeImport:', resumeImport);
			$formData = resumeImport;
		}
	});

	// Initialize default objects for each section
	const newEducation: Education = {
		institution: '',
		degree: '',
		field_of_study: undefined,
		graduation_date: undefined,
		gpa: undefined,
		honors: [''],
		relevant_courses: ['']
	};
	let selectedEducation = $state<Education>({
		institution: newEducation.institution,
		degree: newEducation.degree,
		field_of_study: newEducation.field_of_study,
		graduation_date: newEducation.graduation_date,
		gpa: newEducation.gpa,
		honors: [...(newEducation.honors || [])],
		relevant_courses: [...(newEducation.relevant_courses || [])]
	});

	const newWorkExperience: WorkExperience = {
		company: '',
		position: '',
		start_date: undefined,
		end_date: undefined,
		is_current: false,
		responsibilities: [''],
		technologies: ['']
	};
	let selectedWorkExperience = $state<WorkExperience>({
		company: newWorkExperience.company,
		position: newWorkExperience.position,
		start_date: newWorkExperience.start_date,
		end_date: newWorkExperience.end_date,
		is_current: newWorkExperience.is_current,
		responsibilities: [...(newWorkExperience.responsibilities || [])],
		technologies: [...(newWorkExperience.technologies || [])]
	});

	const newSkill: Skill = {
		name: '',
		level: undefined,
		years_of_experience: undefined
	};
	let selectedSkill = $state<Skill & { category: string }>({
		name: newSkill.name,
		level: newSkill.level,
		years_of_experience: newSkill.years_of_experience,
		category: 'programming_languages'
	});

	const newProject: Project = {
		name: '',
		description: undefined,
		technologies: [''],
		url: undefined,
		github_url: undefined,
		start_date: undefined,
		end_date: undefined,
		role: undefined,
		key_achievements: ['']
	};
	let selectedProject = $state<Project>({
		name: newProject.name,
		description: newProject.description,
		technologies: [...(newProject.technologies || [])],
		url: newProject.url,
		github_url: newProject.github_url,
		start_date: newProject.start_date,
		end_date: newProject.end_date,
		role: newProject.role,
		key_achievements: [...(newProject.key_achievements || [])]
	});

	const newContribution: OpenSourceContribution = {
		project_name: '',
		contribution_type: '',
		description: '',
		url: undefined
	};
	let selectedContribution = $state<OpenSourceContribution>({
		project_name: newContribution.project_name,
		contribution_type: newContribution.contribution_type,
		description: newContribution.description,
		url: newContribution.url
	});

	const newCertification: Certification = {
		name: '',
		issuer: '',
		date_obtained: '',
		expiration_date: undefined,
		credential_id: undefined
	};
	let selectedCertification = $state<Certification>({
		name: newCertification.name,
		issuer: newCertification.issuer,
		date_obtained: newCertification.date_obtained,
		expiration_date: newCertification.expiration_date,
		credential_id: newCertification.credential_id
	});

	// Utility function to handle array fields
	function addItemToArray(array: any[], newItem: any) {
		// Create a plain object copy instead of using structuredClone
		const plainCopy = Array.isArray(newItem)
			? [...newItem]
			: typeof newItem === 'object' && newItem !== null
				? { ...newItem }
				: newItem;
		return [...array, plainCopy];
	}

	// Function to add skill to the appropriate category
	function addSkill() {
		const category = selectedSkill.category;
		// Remove the category property before adding to array
		const { category: _, ...skillToAdd } = selectedSkill;

		// Need to handle each category specifically due to TypeScript
		switch (category) {
			case 'programming_languages':
				$formData.technical_skills.programming_languages = [
					...$formData.technical_skills.programming_languages,
					skillToAdd
				];
				break;
			case 'frameworks_libraries':
				$formData.technical_skills.frameworks_libraries = [
					...$formData.technical_skills.frameworks_libraries,
					skillToAdd
				];
				break;
			case 'databases':
				if (!$formData.technical_skills.databases) {
					$formData.technical_skills.databases = [];
				}
				$formData.technical_skills.databases = [
					...$formData.technical_skills.databases,
					skillToAdd
				];
				break;
			case 'tools':
				$formData.technical_skills.tools = [...$formData.technical_skills.tools, skillToAdd];
				break;
			case 'cloud_platforms':
				$formData.technical_skills.cloud_platforms = [
					...$formData.technical_skills.cloud_platforms,
					skillToAdd
				];
				break;
			case 'other':
				$formData.technical_skills.other = [...$formData.technical_skills.other, skillToAdd];
				break;
		}

		selectedSkill = {
			name: '',
			level: undefined,
			years_of_experience: undefined,
			category: 'programming_languages'
		};
	}

	// Function to handle array of strings
	function handleStringArray(array: string[], value: string) {
		if (array.includes(value)) {
			return array.filter((item) => item !== value);
		} else {
			return [...array, value];
		}
	}

	// Local state for add functions
	let newPublicationText = $state('');
	let newConferenceText = $state('');
	let newVolunteerWorkText = $state('');
	let newInterestText = $state('');
	let newReferenceText = $state('');
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
		<Accordion.Item value="contact">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Contact Information</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Form.Field {form} name="contact_info.full_name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Full Name</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.full_name} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input type="email" {...props} bind:value={$formData.contact_info.email} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.phone">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Phone</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.phone} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.address">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Address</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.address} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.linkedin">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>LinkedIn URL</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.linkedin} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.github">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>GitHub URL</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.github} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.portfolio">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Portfolio URL</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.portfolio} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="contact_info.google_scholar">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Google Scholar URL</Form.Label>
								<Input {...props} bind:value={$formData.contact_info.google_scholar} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Summary -->
		<Accordion.Item value="summary">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Summary</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<Form.Field {form} name="summary">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Professional Summary</Form.Label>
							<Textarea rows={5} {...props} bind:value={$formData.summary} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Education -->
		<Accordion.Item value="education">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Education</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Institution</Table.Head>
							<Table.Head>Degree</Table.Head>
							<Table.Head>Field</Table.Head>
							<Table.Head>Graduated</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each $formData.education as education, i}
							<Table.Row>
								<Table.Cell class="font-medium">{education.institution}</Table.Cell>
								<Table.Cell>{education.degree}</Table.Cell>
								<Table.Cell>{education.field_of_study}</Table.Cell>
								<Table.Cell>{education.graduation_date}</Table.Cell>
							</Table.Row>
						{/each}
						{#if $formData.education.length === 0}
							<Table.Row>
								<Table.Cell colspan={4} class="text-center">No education history added</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>

				<Sheet.Root>
					<Sheet.Trigger
						type="button"
						class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
						onclick={() => {
							selectedEducation = {
								institution: '',
								degree: '',
								field_of_study: undefined,
								graduation_date: undefined,
								gpa: undefined,
								honors: [''],
								relevant_courses: ['']
							};
						}}>Add Education</Sheet.Trigger
					>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>Education</Sheet.Title>
							<Sheet.Description>Add or update your education history.</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="space-y-2">
								<Label for="institution" class="text-right">Institution</Label>
								<Input id="institution" bind:value={selectedEducation.institution} />
							</div>
							<div class="space-y-2">
								<Label for="degree" class="text-right">Degree</Label>
								<Input id="degree" bind:value={selectedEducation.degree} />
							</div>
							<div class="space-y-2">
								<Label for="field_of_study" class="text-right">Field of Study</Label>
								<Input id="field_of_study" bind:value={selectedEducation.field_of_study} />
							</div>
							<div class="space-y-2">
								<Label for="graduation_date" class="text-right">Graduation Date</Label>
								<Input id="graduation_date" bind:value={selectedEducation.graduation_date} />
							</div>
							<div class="space-y-2">
								<Label for="gpa" class="text-right">GPA</Label>
								<Input
									id="gpa"
									type="number"
									min={0}
									max={4}
									step={0.1}
									bind:value={selectedEducation.gpa}
								/>
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => {
									$formData.education = [
										...$formData.education,
										{
											institution: selectedEducation.institution,
											degree: selectedEducation.degree,
											field_of_study: selectedEducation.field_of_study,
											graduation_date: selectedEducation.graduation_date,
											gpa: selectedEducation.gpa,
											honors: [...(selectedEducation.honors || [])],
											relevant_courses: [...(selectedEducation.relevant_courses || [])]
										}
									];
								}}>Save changes</Sheet.Close
							>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Work Experience -->
		<Accordion.Item value="work_experience">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Work Experience</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Company</Table.Head>
							<Table.Head>Position</Table.Head>
							<Table.Head>Period</Table.Head>
							<Table.Head>Current</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each $formData.work_experience as experience, i}
							<Table.Row>
								<Table.Cell class="font-medium">{experience.company}</Table.Cell>
								<Table.Cell>{experience.position}</Table.Cell>
								<Table.Cell>
									{experience.start_date} - {experience.is_current
										? 'Present'
										: experience.end_date}
								</Table.Cell>
								<Table.Cell>{experience.is_current ? 'Yes' : 'No'}</Table.Cell>
							</Table.Row>
						{/each}
						{#if $formData.work_experience.length === 0}
							<Table.Row>
								<Table.Cell colspan={4} class="text-center">No work experience added</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>

				<Sheet.Root>
					<Sheet.Trigger
						type="button"
						class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
						onclick={() => {
							selectedWorkExperience = {
								company: '',
								position: '',
								start_date: undefined,
								end_date: undefined,
								is_current: false,
								responsibilities: [''],
								technologies: ['']
							};
						}}>Add Work Experience</Sheet.Trigger
					>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>Work Experience</Sheet.Title>
							<Sheet.Description>Add or update your work history.</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="space-y-2">
								<Label for="company" class="text-right">Company</Label>
								<Input id="company" bind:value={selectedWorkExperience.company} />
							</div>
							<div class="space-y-2">
								<Label for="position" class="text-right">Position</Label>
								<Input id="position" bind:value={selectedWorkExperience.position} />
							</div>
							<div class="space-y-2">
								<Label for="start_date" class="text-right">Start Date</Label>
								<Input id="start_date" bind:value={selectedWorkExperience.start_date} />
							</div>
							<div class="flex items-center justify-between space-y-0 py-2">
								<Label for="is_current" class="text-right">Current Position</Label>
								<Switch id="is_current" bind:checked={selectedWorkExperience.is_current} />
							</div>
							{#if !selectedWorkExperience.is_current}
								<div class="space-y-2">
									<Label for="end_date" class="text-right">End Date</Label>
									<Input id="end_date" bind:value={selectedWorkExperience.end_date} />
								</div>
							{/if}
							<div class="space-y-2">
								<Label class="text-right">Responsibilities</Label>
								{#each selectedWorkExperience.responsibilities as responsibility, i}
									<div class="flex items-center gap-2">
										<Input
											bind:value={selectedWorkExperience.responsibilities[i]}
											placeholder={`Responsibility ${i + 1}`}
										/>
										{#if i === selectedWorkExperience.responsibilities.length - 1}
											<Button
												variant="outline"
												size="sm"
												onclick={() => {
													selectedWorkExperience.responsibilities = [
														...selectedWorkExperience.responsibilities,
														''
													];
												}}>+</Button
											>
										{/if}
									</div>
								{/each}
							</div>
							<div class="space-y-2">
								<Label class="text-right">Technologies</Label>
								{#each selectedWorkExperience.technologies ?? [''] as technology, i}
									<div class="flex items-center gap-2">
										<Input
											bind:value={selectedWorkExperience.technologies![i]}
											placeholder={`Technology ${i + 1}`}
										/>
										{#if i === (selectedWorkExperience.technologies ?? []).length - 1}
											<Button
												variant="outline"
												size="sm"
												onclick={() => {
													selectedWorkExperience.technologies = [
														...(selectedWorkExperience.technologies || []),
														''
													];
												}}>+</Button
											>
										{/if}
									</div>
								{/each}
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => {
									$formData.work_experience = [
										...$formData.work_experience,
										{
											company: selectedWorkExperience.company,
											position: selectedWorkExperience.position,
											start_date: selectedWorkExperience.start_date,
											end_date: selectedWorkExperience.end_date,
											is_current: selectedWorkExperience.is_current,
											responsibilities: [...(selectedWorkExperience.responsibilities || [])],
											technologies: [...(selectedWorkExperience.technologies || [])]
										}
									];
								}}>Save changes</Sheet.Close
							>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Technical Skills -->
		<Accordion.Item value="skills">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Technical Skills</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<div class="space-y-6">
					<!-- Programming Languages -->
					<div>
						<h4 class="mb-2 font-medium">Programming Languages</h4>
						{#if $formData.technical_skills.programming_languages.length > 0}
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.programming_languages as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<div class="text-sm text-muted-foreground">No programming languages added</div>
						{/if}
					</div>

					<!-- Frameworks & Libraries -->
					<div>
						<h4 class="mb-2 font-medium">Frameworks & Libraries</h4>
						{#if $formData.technical_skills.frameworks_libraries.length > 0}
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.frameworks_libraries as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<div class="text-sm text-muted-foreground">No frameworks or libraries added</div>
						{/if}
					</div>

					<!-- Databases -->
					{#if $formData.technical_skills.databases && $formData.technical_skills.databases.length > 0}
						<div>
							<h4 class="mb-2 font-medium">Databases</h4>
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.databases as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Tools -->
					{#if $formData.technical_skills.tools && $formData.technical_skills.tools.length > 0}
						<div>
							<h4 class="mb-2 font-medium">Tools</h4>
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.tools as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Cloud Platforms -->
					{#if $formData.technical_skills.cloud_platforms && $formData.technical_skills.cloud_platforms.length > 0}
						<div>
							<h4 class="mb-2 font-medium">Cloud Platforms</h4>
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.cloud_platforms as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Other Skills -->
					{#if $formData.technical_skills.other && $formData.technical_skills.other.length > 0}
						<div>
							<h4 class="mb-2 font-medium">Other Skills</h4>
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.technical_skills.other as skill}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{skill.name}</div>
										{#if skill.level}
											<div class="text-sm text-muted-foreground">Level: {skill.level}</div>
										{/if}
										{#if skill.years_of_experience}
											<div class="text-sm text-muted-foreground">
												Experience: {skill.years_of_experience} years
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<Sheet.Root>
						<Sheet.Trigger
							type="button"
							class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
							onclick={() => {
								selectedSkill = {
									name: '',
									level: undefined,
									years_of_experience: undefined,
									category: 'programming_languages'
								};
							}}>Add Skill</Sheet.Trigger
						>
						<Sheet.Content side="right">
							<Sheet.Header>
								<Sheet.Title>Technical Skill</Sheet.Title>
								<Sheet.Description>Add a new technical skill to your resume.</Sheet.Description>
							</Sheet.Header>
							<div class="grid gap-4 py-4">
								<div class="space-y-2">
									<Label for="skill_category" class="text-right">Category</Label>
									<select
										id="skill_category"
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										bind:value={selectedSkill.category}
									>
										<option value="programming_languages">Programming Languages</option>
										<option value="frameworks_libraries">Frameworks & Libraries</option>
										<option value="databases">Databases</option>
										<option value="tools">Tools</option>
										<option value="cloud_platforms">Cloud Platforms</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label for="skill_name" class="text-right">Skill Name</Label>
									<Input id="skill_name" bind:value={selectedSkill.name} />
								</div>
								<div class="space-y-2">
									<Label for="skill_level" class="text-right">Skill Level (Optional)</Label>
									<select
										id="skill_level"
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										bind:value={selectedSkill.level}
									>
										<option value="">Select a level</option>
										<option value="Beginner">Beginner</option>
										<option value="Intermediate">Intermediate</option>
										<option value="Advanced">Advanced</option>
										<option value="Expert">Expert</option>
									</select>
								</div>
								<div class="space-y-2">
									<Label for="years_of_experience" class="text-right"
										>Years of Experience (Optional)</Label
									>
									<Input
										id="years_of_experience"
										type="number"
										min={0}
										step={1}
										bind:value={selectedSkill.years_of_experience}
									/>
								</div>
							</div>
							<Sheet.Footer>
								<Sheet.Close class={buttonVariants({ variant: 'outline' })} onclick={addSkill}>
									Save Skill
								</Sheet.Close>
							</Sheet.Footer>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Projects -->
		<Accordion.Item value="projects">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Projects</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				{#if $formData.projects && $formData.projects.length > 0}
					<div class="grid gap-4">
						{#each $formData.projects as project}
							<div class="rounded-md border border-border p-4">
								<h4 class="text-lg font-semibold">{project.name}</h4>
								{#if project.role}
									<p class="text-sm text-muted-foreground">Role: {project.role}</p>
								{/if}
								{#if project.start_date || project.end_date}
									<p class="text-sm text-muted-foreground">
										Period: {project.start_date || 'N/A'} - {project.end_date || 'Present'}
									</p>
								{/if}
								{#if project.description}
									<p class="mt-2">{project.description}</p>
								{/if}
								{#if project.technologies && project.technologies.length > 0}
									<div class="mt-2">
										<span class="text-sm font-medium">Technologies: </span>
										<span class="text-sm">
											{project.technologies.filter((t) => t).join(', ')}
										</span>
									</div>
								{/if}
								{#if project.key_achievements && project.key_achievements.length > 0}
									<div class="mt-2">
										<span class="text-sm font-medium">Key Achievements:</span>
										<ul class="ml-5 list-disc text-sm">
											{#each project.key_achievements.filter((a) => a) as achievement}
												<li>{achievement}</li>
											{/each}
										</ul>
									</div>
								{/if}
								<div class="mt-2 flex gap-2">
									{#if project.url}
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											class="text-sm text-primary hover:underline"
										>
											Project Link
										</a>
									{/if}
									{#if project.github_url}
										<a
											href={project.github_url}
											target="_blank"
											rel="noopener noreferrer"
											class="text-sm text-primary hover:underline"
										>
											GitHub Repository
										</a>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">No projects added yet.</p>
				{/if}

				<Sheet.Root>
					<Sheet.Trigger
						type="button"
						class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
						onclick={() => {
							selectedProject = {
								name: '',
								description: undefined,
								technologies: [''],
								url: undefined,
								github_url: undefined,
								start_date: undefined,
								end_date: undefined,
								role: undefined,
								key_achievements: ['']
							};
						}}>Add Project</Sheet.Trigger
					>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>Project</Sheet.Title>
							<Sheet.Description>Add a new project to your resume.</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="space-y-2">
								<Label for="project_name" class="text-right">Project Name</Label>
								<Input id="project_name" bind:value={selectedProject.name} />
							</div>
							<div class="space-y-2">
								<Label for="project_role" class="text-right">Your Role</Label>
								<Input id="project_role" bind:value={selectedProject.role} />
							</div>
							<div class="space-y-2">
								<Label for="project_description" class="text-right">Description</Label>
								<Textarea
									id="project_description"
									rows={3}
									bind:value={selectedProject.description}
								/>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div class="space-y-2">
									<Label for="project_start_date" class="text-right">Start Date</Label>
									<Input id="project_start_date" bind:value={selectedProject.start_date} />
								</div>
								<div class="space-y-2">
									<Label for="project_end_date" class="text-right">End Date</Label>
									<Input id="project_end_date" bind:value={selectedProject.end_date} />
								</div>
							</div>
							<div class="space-y-2">
								<Label for="project_url" class="text-right">Project URL</Label>
								<Input id="project_url" type="url" bind:value={selectedProject.url} />
							</div>
							<div class="space-y-2">
								<Label for="project_github_url" class="text-right">GitHub URL</Label>
								<Input id="project_github_url" type="url" bind:value={selectedProject.github_url} />
							</div>
							<div class="space-y-2">
								<Label class="text-right">Technologies Used</Label>
								{#each selectedProject.technologies ?? [''] as tech, i}
									<div class="flex items-center gap-2">
										<Input
											bind:value={selectedProject.technologies![i]}
											placeholder={`Technology ${i + 1}`}
										/>
										{#if i === (selectedProject.technologies ?? []).length - 1}
											<Button
												variant="outline"
												size="sm"
												onclick={() => {
													selectedProject.technologies = [
														...(selectedProject.technologies ?? []),
														''
													];
												}}>+</Button
											>
										{/if}
									</div>
								{/each}
							</div>
							<div class="space-y-2">
								<Label class="text-right">Key Achievements</Label>
								{#each selectedProject.key_achievements ?? [''] as achievement, i}
									<div class="flex items-center gap-2">
										<Input
											bind:value={selectedProject.key_achievements![i]}
											placeholder={`Achievement ${i + 1}`}
										/>
										{#if i === (selectedProject.key_achievements ?? []).length - 1}
											<Button
												variant="outline"
												size="sm"
												onclick={() => {
													selectedProject.key_achievements = [
														...(selectedProject.key_achievements ?? []),
														''
													];
												}}>+</Button
											>
										{/if}
									</div>
								{/each}
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => {
									if (!$formData.projects) {
										$formData.projects = [];
									}
									// Create a plain object instead of cloning the proxy
									const plainProject = {
										name: selectedProject.name,
										description: selectedProject.description,
										technologies: [...(selectedProject.technologies || [])],
										url: selectedProject.url,
										github_url: selectedProject.github_url,
										start_date: selectedProject.start_date,
										end_date: selectedProject.end_date,
										role: selectedProject.role,
										key_achievements: [...(selectedProject.key_achievements || [])]
									};
									$formData.projects = [...$formData.projects, plainProject];
								}}>Save Project</Sheet.Close
							>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Open Source Contributions -->
		<Accordion.Item value="open_source">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Open Source Contributions</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				{#if $formData.open_source_contributions && $formData.open_source_contributions.length > 0}
					<div class="grid gap-4">
						{#each $formData.open_source_contributions as contribution}
							<div class="rounded-md border border-border p-4">
								<h4 class="text-lg font-semibold">{contribution.project_name}</h4>
								<p class="text-sm text-muted-foreground">Type: {contribution.contribution_type}</p>
								<p class="mt-2">{contribution.description}</p>
								{#if contribution.url}
									<a
										href={contribution.url}
										target="_blank"
										rel="noopener noreferrer"
										class="mt-2 inline-block text-sm text-primary hover:underline"
									>
										View Contribution
									</a>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">No open source contributions added yet.</p>
				{/if}

				<Sheet.Root>
					<Sheet.Trigger
						type="button"
						class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
						onclick={() => {
							selectedContribution = {
								project_name: '',
								contribution_type: '',
								description: '',
								url: undefined
							};
						}}>Add Contribution</Sheet.Trigger
					>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>Open Source Contribution</Sheet.Title>
							<Sheet.Description
								>Add a new open source contribution to your resume.</Sheet.Description
							>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="space-y-2">
								<Label for="project_name" class="text-right">Project Name</Label>
								<Input id="project_name" bind:value={selectedContribution.project_name} />
							</div>
							<div class="space-y-2">
								<Label for="contribution_type" class="text-right">Contribution Type</Label>
								<Input
									id="contribution_type"
									bind:value={selectedContribution.contribution_type}
									placeholder="e.g., Code, Documentation, Bug Fix"
								/>
							</div>
							<div class="space-y-2">
								<Label for="description" class="text-right">Description</Label>
								<Textarea id="description" rows={3} bind:value={selectedContribution.description} />
							</div>
							<div class="space-y-2">
								<Label for="contribution_url" class="text-right">URL (Optional)</Label>
								<Input id="contribution_url" type="url" bind:value={selectedContribution.url} />
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => {
									if (!$formData.open_source_contributions) {
										$formData.open_source_contributions = [];
									}
									$formData.open_source_contributions = [
										...$formData.open_source_contributions,
										{
											project_name: selectedContribution.project_name,
											contribution_type: selectedContribution.contribution_type,
											description: selectedContribution.description,
											url: selectedContribution.url
										}
									];
								}}>Save Contribution</Sheet.Close
							>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Certifications -->
		<Accordion.Item value="certifications">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Certifications</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				{#if $formData.certifications && $formData.certifications.length > 0}
					<div class="grid gap-4">
						{#each $formData.certifications as certification}
							<div class="rounded-md border border-border p-4">
								<h4 class="text-lg font-semibold">{certification.name}</h4>
								<p class="text-sm text-muted-foreground">Issuer: {certification.issuer}</p>
								{#if certification.date_obtained}
									<p class="text-sm text-muted-foreground">
										Obtained: {certification.date_obtained}
										{#if certification.expiration_date}
											(Expires: {certification.expiration_date})
										{/if}
									</p>
								{/if}
								{#if certification.credential_id}
									<p class="text-sm text-muted-foreground">
										Credential ID: {certification.credential_id}
									</p>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">No certifications added yet.</p>
				{/if}

				<Sheet.Root>
					<Sheet.Trigger
						type="button"
						class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
						onclick={() => {
							selectedCertification = {
								name: '',
								issuer: '',
								date_obtained: '',
								expiration_date: undefined,
								credential_id: undefined
							};
						}}>Add Certification</Sheet.Trigger
					>
					<Sheet.Content side="right">
						<Sheet.Header>
							<Sheet.Title>Certification</Sheet.Title>
							<Sheet.Description>Add a new certification to your resume.</Sheet.Description>
						</Sheet.Header>
						<div class="grid gap-4 py-4">
							<div class="space-y-2">
								<Label for="cert_name" class="text-right">Certification Name</Label>
								<Input id="cert_name" bind:value={selectedCertification.name} />
							</div>
							<div class="space-y-2">
								<Label for="cert_issuer" class="text-right">Issuer</Label>
								<Input id="cert_issuer" bind:value={selectedCertification.issuer} />
							</div>
							<div class="space-y-2">
								<Label for="date_obtained" class="text-right">Date Obtained</Label>
								<Input id="date_obtained" bind:value={selectedCertification.date_obtained} />
							</div>
							<div class="space-y-2">
								<Label for="expiration_date" class="text-right">Expiration Date (Optional)</Label>
								<Input id="expiration_date" bind:value={selectedCertification.expiration_date} />
							</div>
							<div class="space-y-2">
								<Label for="credential_id" class="text-right">Credential ID (Optional)</Label>
								<Input id="credential_id" bind:value={selectedCertification.credential_id} />
							</div>
						</div>
						<Sheet.Footer>
							<Sheet.Close
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => {
									if (!$formData.certifications) {
										$formData.certifications = [];
									}
									$formData.certifications = [
										...$formData.certifications,
										{
											name: selectedCertification.name,
											issuer: selectedCertification.issuer,
											date_obtained: selectedCertification.date_obtained,
											expiration_date: selectedCertification.expiration_date,
											credential_id: selectedCertification.credential_id
										}
									];
								}}>Save Certification</Sheet.Close
							>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</Accordion.Content>
		</Accordion.Item>

		<!-- Additional Information -->
		<Accordion.Item value="additional">
			<Accordion.Trigger>
				<h3 class="text-2xl font-semibold">Additional Information</h3>
			</Accordion.Trigger>
			<Accordion.Content>
				<div class="grid gap-6">
					<!-- Publications -->
					<div>
						<h4 class="mb-2 font-medium">Publications</h4>
						{#if $formData.publications && $formData.publications.length > 0}
							<ul class="ml-5 list-disc">
								{#each $formData.publications as publication}
									<li>{publication}</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted-foreground">No publications added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input bind:value={newPublicationText} placeholder="Add a publication" />
								<Button
									variant="outline"
									onclick={() => {
										if (newPublicationText) {
											if (!$formData.publications) {
												$formData.publications = [];
											}
											$formData.publications = [...$formData.publications, newPublicationText];
											newPublicationText = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>

					<!-- Conferences -->
					<div>
						<h4 class="mb-2 font-medium">Conferences</h4>
						{#if $formData.conferences && $formData.conferences.length > 0}
							<ul class="ml-5 list-disc">
								{#each $formData.conferences as conference}
									<li>{conference}</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted-foreground">No conferences added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input bind:value={newConferenceText} placeholder="Add a conference" />
								<Button
									variant="outline"
									onclick={() => {
										if (newConferenceText) {
											if (!$formData.conferences) {
												$formData.conferences = [];
											}
											$formData.conferences = [...$formData.conferences, newConferenceText];
											newConferenceText = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>

					<!-- Languages -->
					<div>
						<h4 class="mb-2 font-medium">Languages</h4>
						{#if $formData.languages && $formData.languages.length > 0}
							<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
								{#each $formData.languages as language}
									<div class="rounded-md border border-border p-2">
										<div class="font-medium">{language.name}</div>
										{#if language.level}
											<div class="text-sm text-muted-foreground">Proficiency: {language.level}</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<p class="text-sm text-muted-foreground">No languages added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input placeholder="Language name" id="language_name" />
								<select
									id="language_level"
									class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<option value="">Proficiency level</option>
									<option value="Native">Native</option>
									<option value="Fluent">Fluent</option>
									<option value="Proficient">Proficient</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Basic">Basic</option>
								</select>
								<Button
									variant="outline"
									onclick={() => {
										const name = (document.getElementById('language_name') as HTMLInputElement)
											.value;
										const level = (document.getElementById('language_level') as HTMLSelectElement)
											.value;

										if (name) {
											if (!$formData.languages) {
												$formData.languages = [];
											}
											$formData.languages = [...$formData.languages, { name, level }];
											(document.getElementById('language_name') as HTMLInputElement).value = '';
											(document.getElementById('language_level') as HTMLSelectElement).value = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>

					<!-- Volunteer Work -->
					<div>
						<h4 class="mb-2 font-medium">Volunteer Work</h4>
						{#if $formData.volunteer_work && $formData.volunteer_work.length > 0}
							<ul class="ml-5 list-disc">
								{#each $formData.volunteer_work as work}
									<li>{work}</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted-foreground">No volunteer work added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input bind:value={newVolunteerWorkText} placeholder="Add volunteer work" />
								<Button
									variant="outline"
									onclick={() => {
										if (newVolunteerWorkText) {
											if (!$formData.volunteer_work) {
												$formData.volunteer_work = [];
											}
											$formData.volunteer_work = [
												...$formData.volunteer_work,
												newVolunteerWorkText
											];
											newVolunteerWorkText = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>

					<!-- Interests -->
					<div>
						<h4 class="mb-2 font-medium">Interests</h4>
						{#if $formData.interests && $formData.interests.length > 0}
							<ul class="ml-5 list-disc">
								{#each $formData.interests as interest}
									<li>{interest}</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted-foreground">No interests added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input bind:value={newInterestText} placeholder="Add an interest" />
								<Button
									variant="outline"
									onclick={() => {
										if (newInterestText) {
											if (!$formData.interests) {
												$formData.interests = [];
											}
											$formData.interests = [...$formData.interests, newInterestText];
											newInterestText = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>

					<!-- References -->
					<div>
						<h4 class="mb-2 font-medium">References</h4>
						{#if $formData.references && $formData.references.length > 0}
							<ul class="ml-5 list-disc">
								{#each $formData.references as reference}
									<li>{reference}</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted-foreground">No references added.</p>
						{/if}
						<div class="mt-2">
							<div class="flex gap-2">
								<Input bind:value={newReferenceText} placeholder="Add a reference" />
								<Button
									variant="outline"
									onclick={() => {
										if (newReferenceText) {
											$formData.references = [...$formData.references, newReferenceText];
											newReferenceText = '';
										}
									}}
								>
									Add
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<div class="mt-8 flex justify-end gap-2 py-4">
		{#if isSaving}
			<Button variant="outline" disabled><Loader class="animate-spin" /> Saving...</Button>
		{:else}
			<Form.Button type="submit">Save Resume</Form.Button>
		{/if}
	</div>
</form>
