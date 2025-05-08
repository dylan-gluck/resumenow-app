<script lang="ts">
	import * as Accordion from '@/components/ui/accordion';
	import * as Sheet from '@/components/ui/sheet';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { Textarea } from '@/components/ui/textarea';
	import { type SuperForm } from 'sveltekit-superforms';
	import type { FormSchema } from '../schema';
	import type { Infer } from 'sveltekit-superforms';
	import type { OpenSourceContribution } from '@/types/resume';
	import * as Card from '@/components/ui/card';

	let {
		form,
		formData
	}: {
		form: SuperForm<Infer<FormSchema>>;
		formData: any; // The bound form data from the parent
	} = $props();

	// State for managing open source contribution entries
	const newContribution: OpenSourceContribution = {
		project_name: '',
		contribution_type: '',
		description: '',
		url: ''
	};

	let selectedContribution = $state<OpenSourceContribution>({
		project_name: newContribution.project_name,
		contribution_type: newContribution.contribution_type,
		description: newContribution.description,
		url: newContribution.url
	});

	// Method to reset the selected contribution
	function resetSelectedContribution() {
		selectedContribution = {
			project_name: '',
			contribution_type: '',
			description: '',
			url: ''
		};
	}

	// Method to save a contribution to the form
	function saveContribution() {
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
	}
</script>

<Accordion.Item value="open_source_contributions">
	<Accordion.Trigger>
		<h3 class="text-2xl font-semibold">Open Source Contributions</h3>
	</Accordion.Trigger>
	<Accordion.Content>
		{#if $formData.open_source_contributions && $formData.open_source_contributions.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each $formData.open_source_contributions as contribution}
					<Card.Root>
						<Card.Header>
							<Card.Title>{contribution.project_name}</Card.Title>
							{#if contribution.contribution_type}
								<Card.Description>{contribution.contribution_type}</Card.Description>
							{/if}
						</Card.Header>
						<Card.Content>
							{#if contribution.description}
								<p class="mb-2">{contribution.description}</p>
							{/if}
						</Card.Content>
						<Card.Footer>
							{#if contribution.url}
								<a href={contribution.url} target="_blank"> View Contribution </a>
							{/if}
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-muted-foreground">No open source contributions added.</p>
		{/if}

		<Sheet.Root>
			<Sheet.Trigger
				type="button"
				class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
				onclick={resetSelectedContribution}>Add Contribution</Sheet.Trigger
			>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Add Open Source Contribution</Sheet.Title>
					<Sheet.Description>Add details about your open source contributions.</Sheet.Description>
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
							placeholder="e.g., Bug Fix, Feature, Documentation"
						/>
					</div>

					<div class="space-y-2">
						<Label for="description" class="text-right">Description</Label>
						<Textarea id="description" bind:value={selectedContribution.description} />
					</div>

					<div class="space-y-2">
						<Label for="url" class="text-right">URL</Label>
						<Input
							id="url"
							bind:value={selectedContribution.url}
							placeholder="Link to PR, issue, or repository"
						/>
					</div>
				</div>
				<Sheet.Footer>
					<Sheet.Close class={buttonVariants({ variant: 'outline' })} onclick={saveContribution}
						>Save Contribution</Sheet.Close
					>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</Accordion.Content>
</Accordion.Item>
