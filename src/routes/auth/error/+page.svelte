<script>
	import { goto } from '$app/navigation';
	import { Button } from '@/components/ui/button';
</script>

<svelte:head>
	<title>Error | ResumeNow</title>
</svelte:head>

<main class="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-primary">Uh oh!</p>
		<h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
			Something went wrong
		</h1>
		<p class="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
			There was a problem logging in. Please try again.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button onclick={() => goto('/auth')}>Back to Login</Button>
		</div>
	</div>
</main>
