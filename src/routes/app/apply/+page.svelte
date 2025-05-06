<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';

	let { data } = $props();
</script>

<svelte:head>
	<title>Apply | Svelte Saas Starter</title>
</svelte:head>

<div class="grid flex-1 place-items-center">
	<div class="container mb-[200px] text-center">
		<h1 class="text-4xl font-bold leading-none">Apply to Position</h1>
		<p class="mx-auto mt-4 max-w-[60ch] text-lg text-muted-foreground">
			Enter the url of the job posting below to automatically pull in the description and generate a
			custom resume, or enter the information manually.
		</p>
		<div class="mx-auto mt-8 flex max-w-2xl items-center gap-2">
			<Input type="text" placeholder="https://..." />
			<Button>Apply</Button>
		</div>
	</div>
</div>
