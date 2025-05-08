<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { stringProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		placeholder = '',
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathLeaves<T, string>;
		label?: string;
		placeholder?: string;
	} = $props();

	// Using stringProxy with type parameters since our schema has dates as strings
	const proxy = stringProxy<T, FormPathLeaves<T, string>>(form, field, {
		empty: 'undefined',
		taint: true
	});
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			{#if label}
				<Form.Label>{label}</Form.Label>
			{/if}
			<Input type="date" {placeholder} bind:value={$proxy} {...props} {...rest} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
