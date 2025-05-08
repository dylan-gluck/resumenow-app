<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		type = 'text',
		placeholder = '',
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathLeaves<T, string>;
		label?: string;
		type?: string;
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
			<Input {type} {placeholder} bind:value={$value} {...props} {...rest} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
