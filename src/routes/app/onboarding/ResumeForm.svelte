<script lang="ts">
	import * as Form from '@/components/ui/form';
	import * as Table from '$lib/components/ui/table';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Textarea } from '@/components/ui/textarea';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type Education } from '@/types/resume';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		resetForm: false
	});

	const { form: formData, enhance } = form;

	const newEducation: Education = {
		institution: undefined,
		degree: undefined,
		field_of_study: undefined,
		graduation_date: undefined,
		gpa: undefined,
		honors: [''],
		relevant_courses: ['']
	};
	let selectedEducation = $state(newEducation);
</script>

<form method="post" class="flex flex-col gap-4" use:enhance>
	<div class="flex flex-col gap-2">
		<h3 class="text-2xl font-semibold">Contact Information</h3>
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
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-2xl font-semibold">Summary</h3>
		<Form.Field {form} name="summary">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Short Bio</Form.Label>
					<Textarea {...props} bind:value={$formData.summary} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-2xl font-semibold">Education</h3>
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
				class={buttonVariants({ variant: 'outline' }) + ' w-fit'}
				onclick={() => {
					selectedEducation = newEducation;
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
							$formData.education = [...$formData.education, selectedEducation];
						}}>Save changes</Sheet.Close
					>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
	<div class="mt-10 flex justify-end gap-2 border-t border-border py-4">
		<Form.Button>Submit</Form.Button>
	</div>
</form>
