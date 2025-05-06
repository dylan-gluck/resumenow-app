<script>
	import { Button } from '@/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Logo from '@/components/logo/Logo.svelte';

	let { user } = $derived(page.data);
</script>

<header class="py-6">
	<div class="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-center">
			<a href="/" class="text-sm leading-none">Home</a>
			<a href="##" class="text-sm leading-none">Pricing</a>
		</div>
		<div class="navbar-end">
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
					onclick={() => {
						goto('/auth/register');
					}}>Sign-up</Button
				>
				<Button
					size="sm"
					variant="ghost"
					onclick={() => {
						goto('/auth');
					}}>Login</Button
				>
			{/if}
		</div>
	</div>
</header>
