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
	<div class="container flex items-center justify-between gap-4">
		<div class="navbar-start">
			<Logo />
		</div>
		<div class="navbar-center gap-6">
			<a href="/app/apply" class="text-sm leading-none">Apply</a>
			<a href="##" class="text-sm leading-none">Positions</a>
			<a href="/app/resume" class="text-sm leading-none">Resume</a>
		</div>
		<div class="navbar-end gap-4">
			<Button size="sm" variant="outline" onclick={logout}>Logout</Button>
		</div>
	</div>
</header>
