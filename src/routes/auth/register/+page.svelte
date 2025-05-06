<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import Logo from '@/components/logo/Logo.svelte';
</script>

<svelte:head>
	<title>Create Account | Svelte Saas Starter</title>
</svelte:head>

<div class="py-24 sm:py-32">
	<form method="POST" action="?/signup" class="container max-w-lg">
		<div class="mb-10 flex justify-center">
			<Logo />
		</div>
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Create Account</Card.Title>
				<Card.Description>Enter your email and password to create an account</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-3">
				<Button type="submit" class="w-full">Sign Up</Button>
				<div class="mt-2 text-center text-sm">
					Already have an account?
					<a href="/auth" class="underline">Login</a>
				</div>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
