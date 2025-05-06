<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '@/components/ui/button';
	import { ArrowRight } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let positions = $derived(data.positions);
</script>

<svelte:head>
	<title>Positions | ResumeNow</title>
</svelte:head>

<div class="py-12">
	<div class="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-4 text-center">
			<h2 class="text-4xl font-bold leading-none">My Positions</h2>
			<p class="mt-4 max-w-[60ch] text-lg text-muted-foreground">
				Track positions you have applied to including company and role info. Generate customised
				resume, cover letters, and interview prep documents.
			</p>
		</div>
	</div>
	<div class="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-tl-xl rounded-tr-xl border border-b-0 border-border p-12">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Company</Table.Head>
						<Table.Head>Title</Table.Head>
						<Table.Head>Resume</Table.Head>
						<Table.Head>Cover Letter</Table.Head>
						<Table.Head class="text-right"></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each positions as position}
						<Table.Row>
							<Table.Cell>{position.company}</Table.Cell>
							<Table.Cell class="font-medium">{position.title}</Table.Cell>
							<Table.Cell>{position.resume ? 'True' : 'False'}</Table.Cell>
							<Table.Cell>{position.cover_letter ? 'True' : 'False'}</Table.Cell>
							<Table.Cell class="text-right">
								<Button
									variant="outline"
									size="sm"
									onclick={() => goto(`/app/positions/${position.id}`)}
									>Details <ArrowRight /></Button
								>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</div>
