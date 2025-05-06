<script>
	import AppHeader from './AppHeader.svelte';

	let { children } = $props();
</script>

<AppHeader />
<main class="flex flex-1 flex-col">
	{@render children()}
</main>
