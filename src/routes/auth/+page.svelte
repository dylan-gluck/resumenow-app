<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import Logo from '@/components/logo/Logo.svelte';
</script>

<svelte:head>
	<title>Login | ResumeNow</title>
</svelte:head>

<div class="py-24 sm:py-32">
	<form method="POST" action="?/login" class="container max-w-lg">
		<div class="mb-10 flex justify-center">
			<Logo />
		</div>
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login to your account</Card.Description>
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
				<Button type="submit" class="w-full">Login</Button>
				<Button type="button" variant="outline" class="w-full">Login with Google</Button>
				<div class="mt-2 text-center text-sm">
					Don't have an account?
					<a href="/auth/register" class="underline">Sign up</a>
				</div>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
