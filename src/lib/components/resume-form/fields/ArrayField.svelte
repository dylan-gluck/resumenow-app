<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { arrayProxy, type SuperForm, type FormPathArrays } from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		placeholder = '',
		addLabel = '+',
		emptyMessage = 'No items added',
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathArrays<T, string[]>;
		label?: string;
		placeholder?: string;
		addLabel?: string;
		emptyMessage?: string;
	} = $props();

	// Create proxy with specific type for the array elements
	const { path, values, errors, valueErrors } = arrayProxy<T, FormPathArrays<T, string[]>, string>(
		form,
		field
	);
	
	// Function to add a new empty item to the array
	function addEmptyItem() {
		// Use type assertion to handle the type conversion safely
		const currentValues = [...$values];
		currentValues.push("" as any);
		$values = currentValues;
	}
</script>

<div class="space-y-2">
	{#if label}
		<Form.Label>{label}</Form.Label>
	{/if}

	{#if $values.length === 0}
		<p class="text-sm text-muted-foreground">{emptyMessage}</p>
	{/if}

	{#each $values as _, i}
		<div class="flex items-center gap-2">
			<Input bind:value={$values[i]} placeholder={`${placeholder} ${i + 1}`} {...rest} />
			{#if i === $values.length - 1}
				<Button
					variant="outline"
					size="sm"
					onclick={addEmptyItem}
				>
					{addLabel}
				</Button>
			{/if}
		</div>
	{/each}

	{#if $values.length === 0}
		<Button
			variant="outline"
			size="sm"
			onclick={addEmptyItem}
		>
			Add {label || 'Item'}
		</Button>
	{/if}
</div>
