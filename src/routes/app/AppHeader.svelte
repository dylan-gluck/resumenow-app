<script>
	import { Button } from '@/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Logo from '@/components/logo/Logo.svelte';

	let { supabase } = $derived(page.data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/auth');
	};
</script>

<header class="py-6">
	<div class="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-center gap-6">
			<a href="/app/apply" class="navbar-link" class:active={page.url.pathname === '/app/apply'}
				>Apply</a
			>
			<a
				href="/app/positions"
				class="navbar-link"
				class:active={page.url.pathname.startsWith('/app/positions')}>Positions</a
			>
			<a href="/app/resume" class="navbar-link" class:active={page.url.pathname === '/app/resume'}
				>Resume</a
			>
		</div>
		<div class="navbar-end gap-4">
			<Button size="sm" variant="outline" onclick={logout}>Logout</Button>
		</div>
	</div>
</header>
