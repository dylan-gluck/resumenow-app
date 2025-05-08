<script lang="ts">
	import { Button } from '@/components/ui/button/index.js';
	import { CircleDollarSign, Loader, MapPin } from '@lucide/svelte';
	import type { PageData } from './$types';
	import type { Job } from '@/types/job';

	let { data }: { data: PageData } = $props();

	let position = $derived(data.position);
	let jobData = $derived(position?.job_data as unknown as Job);
</script>

<svelte:head>
	<title>{position?.title} - {position?.company} | ResumeNow</title>
</svelte:head>

{#if position}
	<div class="flex flex-col">
		<div class="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center gap-4 text-center">
				<span class="font-semibold text-primary">{position.company}</span>
				<h2 class="text-3xl font-bold">{position.title}</h2>
				<div class="flex items-center justify-center gap-4">
					{#if jobData?.location}
						<span class="flex items-center gap-1 text-muted-foreground">
							<MapPin class="h-4 w-4" />
							<span>{jobData?.location?.[0]}</span>
						</span>
					{/if}
					{#if jobData?.salary}
						<span class="flex items-center gap-1 text-muted-foreground">
							<CircleDollarSign class="h-4 w-4" />
							<span>{jobData?.salary}</span>
						</span>
					{/if}
				</div>
				<div class="flex items-center justify-center gap-4">
					{#if !position.resume}
						<Button onclick={() => {}} variant="outline" size="sm">Generate Resume</Button>
					{/if}
					{#if !position.cover_letter}
						<Button onclick={() => {}} variant="outline" size="sm">Generate Cover Letter</Button>
					{/if}
				</div>
			</div>
		</div>
		<div class="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
			<div class="rounded-tl-xl rounded-tr-xl border border-b-0 border-border p-12">
				<div class="px-4 sm:px-0">
					<h3 class="text-base/7 font-semibold text-foreground">{position.title}</h3>
					<p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
						{position.company}
					</p>
				</div>
				<div class="mt-6 border-t border-border">
					<dl class="divide-y divide-border">
						{#if jobData?.description}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm/6 font-medium text-foreground">Description</dt>
								<dd class="mt-1 text-sm/6 text-foreground/80 sm:col-span-2 sm:mt-0">
									{jobData?.description}
								</dd>
							</div>
						{/if}
						{#if jobData?.responsibilities}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm/6 font-medium text-foreground">Responsibilities</dt>
								<dd class="mt-1 text-sm/6 text-foreground/80 sm:col-span-2 sm:mt-0">
									<ul class="list-disc space-y-2">
										{#each jobData?.responsibilities || [] as responsibility}
											<li class="list-item">{responsibility}</li>
										{/each}
									</ul>
								</dd>
							</div>
						{/if}
						{#if jobData?.qualifications}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm/6 font-medium text-foreground">Qualifications</dt>
								<dd class="mt-1 text-sm/6 text-foreground/80 sm:col-span-2 sm:mt-0">
									<ul class="list-disc space-y-2">
										{#each jobData?.qualifications || [] as qualification}
											<li class="list-item">{qualification}</li>
										{/each}
									</ul>
								</dd>
							</div>
						{/if}
						{#if jobData?.logistics}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm/6 font-medium text-foreground">Logistics</dt>
								<dd class="mt-1 text-sm/6 text-foreground/80 sm:col-span-2 sm:mt-0">
									<ul class="space-y-2">
										{#each jobData?.logistics || [] as logistics}
											<li class="list-item">{logistics}</li>
										{/each}
									</ul>
								</dd>
							</div>
						{/if}
						{#if jobData?.additional_info}
							<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
								<dt class="text-sm/6 font-medium text-foreground">Additional Information</dt>
								<dd class="mt-1 text-sm/6 text-foreground/80 sm:col-span-2 sm:mt-0">
									<ul class="space-y-2">
										{#each jobData?.additional_info || [] as additional_info}
											<li class="list-item">{additional_info}</li>
										{/each}
									</ul>
								</dd>
							</div>
						{/if}
					</dl>
				</div>
			</div>
		</div>
	</div>
{/if}
