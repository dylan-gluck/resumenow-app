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
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { ScrollArea } from '@/components/ui/scroll-area';

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

	// State for edit mode
	let isEditMode = $state(false);
	let editIndex = $state(-1);
	let sheetOpen = $state(false);

	// Method to reset the selected contribution
	function resetSelectedContribution() {
		selectedContribution = {
			project_name: '',
			contribution_type: '',
			description: '',
			url: ''
		};
	}

	// Start add mode
	function startAddMode() {
		isEditMode = false;
		editIndex = -1;
		resetSelectedContribution();
		sheetOpen = true;
	}

	// Start edit mode
	function startEditMode(index: number) {
		isEditMode = true;
		editIndex = index;

		// Clone the selected contribution to avoid direct mutation
		const contribution = $formData.open_source_contributions[index];
		selectedContribution = {
			project_name: contribution.project_name,
			contribution_type: contribution.contribution_type || '',
			description: contribution.description || '',
			url: contribution.url || ''
		};

		sheetOpen = true;
	}

	// Delete contribution
	function deleteContribution(index: number) {
		if (!$formData.open_source_contributions) return;

		$formData.open_source_contributions = $formData.open_source_contributions.filter(
			(_: OpenSourceContribution, i: number) => i !== index
		);
	}

	// Method to save a contribution to the form
	function saveContribution() {
		if (!$formData.open_source_contributions) {
			$formData.open_source_contributions = [];
		}

		const contributionData = {
			project_name: selectedContribution.project_name,
			contribution_type: selectedContribution.contribution_type,
			description: selectedContribution.description,
			url: selectedContribution.url
		};

		if (isEditMode && editIndex >= 0) {
			// Update existing contribution
			$formData.open_source_contributions = $formData.open_source_contributions.map(
				(contribution: OpenSourceContribution, i: number) => {
					if (i === editIndex) {
						return contributionData;
					}
					return contribution;
				}
			);
		} else {
			// Add new contribution
			$formData.open_source_contributions = [
				...$formData.open_source_contributions,
				contributionData
			];
		}

		// Reset state
		isEditMode = false;
		editIndex = -1;
	}
</script>

<Accordion.Item value="open_source_contributions">
	<Accordion.Trigger>
		<h3 class="text-2xl font-semibold">Open Source Contributions</h3>
	</Accordion.Trigger>
	<Accordion.Content>
		{#if $formData.open_source_contributions && $formData.open_source_contributions.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each $formData.open_source_contributions as contribution, i}
					<Card.Root class="relative">
						<div class="absolute right-2 top-2 z-10 flex gap-1">
							<Button variant="ghost" size="icon" class="h-8 w-8" onclick={() => startEditMode(i)}>
								<Pencil class="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								class="h-8 w-8"
								onclick={() => deleteContribution(i)}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
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

		<Sheet.Root bind:open={sheetOpen}>
			<Sheet.Trigger
				type="button"
				class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
				onclick={startAddMode}>Add Contribution</Sheet.Trigger
			>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>{isEditMode ? 'Edit' : 'Add'} Open Source Contribution</Sheet.Title>
					<Sheet.Description
						>{isEditMode ? 'Update' : 'Add'} details about your open source contribution.</Sheet.Description
					>
				</Sheet.Header>
				<ScrollArea class="flex-1">
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
				</ScrollArea>
				<Sheet.Footer>
					<div class="flex w-full justify-end gap-2">
						<Button
							variant="outline"
							onclick={() => {
								sheetOpen = false;
							}}
						>
							Cancel
						</Button>
						<Sheet.Close class={buttonVariants()} onclick={saveContribution}>
							{isEditMode ? 'Update' : 'Save'} Contribution
						</Sheet.Close>
					</div>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</Accordion.Content>
</Accordion.Item>
