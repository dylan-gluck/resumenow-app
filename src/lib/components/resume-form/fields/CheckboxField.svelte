<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '@/components/ui/form';
	import { Switch } from '@/components/ui/switch';
	import {
		formFieldProxy,
		type FormFieldProxy,
		type SuperForm,
		type FormPathLeaves
	} from 'sveltekit-superforms';

	let {
		form,
		field,
		label,
		...rest
	}: {
		form: SuperForm<T>;
		field: FormPathLeaves<T, boolean>;
		label?: string;
	} = $props();

	const { value, errors, constraints } = formFieldProxy(
		form,
		field
	) satisfies FormFieldProxy<boolean>;
</script>

<div class="flex items-center justify-between space-y-0 py-2">
	{#if label}
		<Form.Label>{label}</Form.Label>
	{/if}
	<Switch
		checked={$value}
		onchange={(e) => {
			$value = (e.target as HTMLInputElement).checked;
		}}
		{...rest}
	/>
</div>
