<script lang="ts">
	import * as Accordion from '@/components/ui/accordion';
	import * as Sheet from '@/components/ui/sheet';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { type SuperForm } from 'sveltekit-superforms';
	import type { FormSchema } from '../schema';
	import type { Infer } from 'sveltekit-superforms';
	import type { Certification } from '@/types/resume';
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

	// State for managing certification entries
	const newCertification: Certification = {
		name: '',
		issuer: '',
		date_obtained: '',
		expiration_date: '',
		credential_id: ''
	};

	let selectedCertification = $state<Certification>({
		name: newCertification.name,
		issuer: newCertification.issuer,
		date_obtained: newCertification.date_obtained,
		expiration_date: newCertification.expiration_date,
		credential_id: newCertification.credential_id
	});

	// State for edit mode
	let isEditMode = $state(false);
	let editIndex = $state(-1);
	let sheetOpen = $state(false);

	// Method to reset the selected certification
	function resetSelectedCertification() {
		selectedCertification = {
			name: '',
			issuer: '',
			date_obtained: '',
			expiration_date: '',
			credential_id: ''
		};
	}

	// Start add mode
	function startAddMode() {
		isEditMode = false;
		editIndex = -1;
		resetSelectedCertification();
		sheetOpen = true;
	}

	// Start edit mode
	function startEditMode(index: number) {
		isEditMode = true;
		editIndex = index;

		// Clone the selected certification to avoid direct mutation
		const certification = $formData.certifications[index];
		selectedCertification = {
			name: certification.name,
			issuer: certification.issuer,
			date_obtained: certification.date_obtained || '',
			expiration_date: certification.expiration_date || '',
			credential_id: certification.credential_id || ''
		};

		sheetOpen = true;
	}

	// Delete certification
	function deleteCertification(index: number) {
		if (!$formData.certifications) return;

		$formData.certifications = $formData.certifications.filter(
			(_: Certification, i: number) => i !== index
		);
	}

	// Method to save a certification to the form
	function saveCertification() {
		if (!$formData.certifications) {
			$formData.certifications = [];
		}

		const certificationData = {
			name: selectedCertification.name,
			issuer: selectedCertification.issuer,
			date_obtained: selectedCertification.date_obtained,
			expiration_date: selectedCertification.expiration_date,
			credential_id: selectedCertification.credential_id
		};

		if (isEditMode && editIndex >= 0) {
			// Update existing certification
			$formData.certifications = $formData.certifications.map(
				(certification: Certification, i: number) => {
					if (i === editIndex) {
						return certificationData;
					}
					return certification;
				}
			);
		} else {
			// Add new certification
			$formData.certifications = [...$formData.certifications, certificationData];
		}

		// Reset state
		isEditMode = false;
		editIndex = -1;
	}
</script>

<Accordion.Item value="certifications">
	<Accordion.Trigger>
		<h3 class="text-2xl font-semibold">Certifications</h3>
	</Accordion.Trigger>
	<Accordion.Content>
		{#if $formData.certifications && $formData.certifications.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each $formData.certifications as certification, i}
					<Card.Root class="relative">
						<div class="absolute right-2 top-2 z-10 flex gap-1">
							<Button variant="ghost" size="icon" class="h-8 w-8" onclick={() => startEditMode(i)}>
								<Pencil class="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								class="h-8 w-8"
								onclick={() => deleteCertification(i)}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
						<Card.Header>
							<Card.Title>{certification.name}</Card.Title>
							<Card.Description>{certification.issuer}</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="space-y-1 text-sm">
								{#if certification.date_obtained}
									<p>
										<span class="font-medium">Date Obtained:</span>
										{certification.date_obtained}
									</p>
								{/if}
								{#if certification.expiration_date}
									<p>
										<span class="font-medium">Expiration Date:</span>
										{certification.expiration_date}
									</p>
								{/if}
								{#if certification.credential_id}
									<p>
										<span class="font-medium">Credential ID:</span>
										{certification.credential_id}
									</p>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-muted-foreground">No certifications added.</p>
		{/if}

		<Sheet.Root bind:open={sheetOpen}>
			<Sheet.Trigger
				type="button"
				class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
				onclick={startAddMode}>Add Certification</Sheet.Trigger
			>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>{isEditMode ? 'Edit' : 'Add'} Certification</Sheet.Title>
					<Sheet.Description
						>{isEditMode ? 'Update' : 'Add'} details about your certification.</Sheet.Description
					>
				</Sheet.Header>
				<ScrollArea class="flex-1">
					<div class="grid gap-4 py-4">
						<div class="space-y-2">
							<Label for="name" class="text-right">Certification Name</Label>
							<Input id="name" bind:value={selectedCertification.name} />
						</div>

						<div class="space-y-2">
							<Label for="issuer" class="text-right">Issuing Organization</Label>
							<Input id="issuer" bind:value={selectedCertification.issuer} />
						</div>

						<div class="space-y-2">
							<Label for="date_obtained" class="text-right">Date Obtained</Label>
							<Input id="date_obtained" bind:value={selectedCertification.date_obtained} />
						</div>

						<div class="space-y-2">
							<Label for="expiration_date" class="text-right">Expiration Date</Label>
							<Input id="expiration_date" bind:value={selectedCertification.expiration_date} />
						</div>

						<div class="space-y-2">
							<Label for="credential_id" class="text-right">Credential ID</Label>
							<Input id="credential_id" bind:value={selectedCertification.credential_id} />
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
						<Sheet.Close class={buttonVariants()} onclick={saveCertification}>
							{isEditMode ? 'Update' : 'Save'} Certification
						</Sheet.Close>
					</div>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</Accordion.Content>
</Accordion.Item>
