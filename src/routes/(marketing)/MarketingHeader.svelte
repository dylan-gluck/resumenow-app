<script>
	import { Button } from '@/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { user } = $derived(page.data);
</script>

<header class="border-b border-border py-6">
	<div class="container flex items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<a href="/"><h1 class="mr-10 text-2xl font-bold leading-none">abc.</h1></a>
			<a href="/" class="text-sm leading-none">Home</a>
			<a href="##" class="text-sm leading-none">Pricing</a>
		</div>
		<div class="flex items-center gap-2">
			{#if user}
				<Button
					size="sm"
					onclick={() => {
						goto('/app');
					}}>Dashboard</Button
				>
			{:else}
				<Button
					size="sm"
					variant="outline"
					onclick={() => {
						goto('/auth/register');
					}}>Create Account</Button
				>
				<Button
					size="sm"
					onclick={() => {
						goto('/auth');
					}}>Login</Button
				>
			{/if}
		</div>
	</div>
</header>
