<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { Textarea } from '@/components/ui/textarea';
	import { stringProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		placeholder = '',
		rows = 3,
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathLeaves<T, string>;
		label?: string;
		placeholder?: string;
		rows?: number;
	} = $props();

	// Using stringProxy instead of formFieldProxy for better type safety
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
			<Textarea {rows} {placeholder} bind:value={$proxy} {...props} {...rest} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
