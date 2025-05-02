<script>
	import AppHeader from './AppHeader.svelte';

	let { children } = $props();
</script>

<AppHeader />
<main>
	{@render children()}
</main>
