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
		<Logo />
		<div class="flex items-center gap-4">
			<a href="/app/dashboard" class="text-sm leading-none">Dashboard</a>
			<a href="/app/resume" class="text-sm leading-none">Base Resume</a>
			<a href="/app/settings" class="text-sm leading-none">Settings</a>
		</div>
		<div class="flex items-center gap-4">
			<Button size="sm" variant="outline" onclick={logout}>Logout</Button>
		</div>
	</div>
</header>
