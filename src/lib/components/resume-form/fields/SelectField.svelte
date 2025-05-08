<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		options,
		placeholder = 'Select an option',
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathLeaves<T, string>;
		label?: string;
		options: Array<{ value: string; label: string }>;
		placeholder?: string;
	} = $props();

	const { value, errors, constraints } = formFieldProxy(form, field);
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			{#if label}
				<Form.Label>{label}</Form.Label>
			{/if}
			<select
				class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				bind:value={$value}
				{...props}
				{...rest}
			>
				<option value="">{placeholder}</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
