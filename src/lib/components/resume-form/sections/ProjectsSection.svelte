<script lang="ts">
	import * as Accordion from '@/components/ui/accordion';
	import * as Sheet from '@/components/ui/sheet';
	import { Label } from '@/components/ui/label';
	import { Input } from '@/components/ui/input';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { Textarea } from '@/components/ui/textarea';
	import { type SuperForm } from 'sveltekit-superforms';
	import type { FormSchema } from '../schema';
	import type { Infer } from 'sveltekit-superforms';
	import type { Project } from '@/types/resume';
	import * as Card from '@/components/ui/card';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { ScrollArea } from '@/components/ui/scroll-area';

	let {
		form,
		formData
	}: {
		form: SuperForm<Infer<FormSchema>>;
		formData: any; // The bound form data from the parent
	} = $props();

	// State for managing project entries
	const newProject: Project = {
		name: '',
		description: '',
		technologies: [''],
		url: '',
		github_url: '',
		start_date: '',
		end_date: '',
		role: '',
		key_achievements: ['']
	};

	let selectedProject = $state<Project>({
		name: newProject.name,
		description: newProject.description,
		technologies: [...(newProject.technologies || [])],
		url: newProject.url,
		github_url: newProject.github_url,
		start_date: newProject.start_date,
		end_date: newProject.end_date,
		role: newProject.role,
		key_achievements: [...(newProject.key_achievements || [])]
	});

	// State for edit mode
	let isEditMode = $state(false);
	let editIndex = $state(-1);
	let sheetOpen = $state(false);

	// Method to reset the selected project
	function resetSelectedProject() {
		selectedProject = {
			name: '',
			description: '',
			technologies: [''],
			url: '',
			github_url: '',
			start_date: '',
			end_date: '',
			role: '',
			key_achievements: ['']
		};
	}

	// Start add mode
	function startAddMode() {
		isEditMode = false;
		editIndex = -1;
		resetSelectedProject();
		sheetOpen = true;
	}

	// Start edit mode
	function startEditMode(index: number) {
		isEditMode = true;
		editIndex = index;

		// Clone the selected project to avoid direct mutation
		const project = $formData.projects[index];
		selectedProject = {
			name: project.name,
			description: project.description || '',
			technologies: project.technologies ? [...project.technologies] : [''],
			url: project.url || '',
			github_url: project.github_url || '',
			start_date: project.start_date || '',
			end_date: project.end_date || '',
			role: project.role || '',
			key_achievements: project.key_achievements ? [...project.key_achievements] : ['']
		};

		sheetOpen = true;
	}

	// Delete project
	function deleteProject(index: number) {
		if (!$formData.projects) return;

		$formData.projects = $formData.projects.filter((_: Project, i: number) => i !== index);
	}

	// Method to save a project to the form
	function saveProject() {
		if (!$formData.projects) {
			$formData.projects = [];
		}

		const projectData = {
			name: selectedProject.name,
			description: selectedProject.description,
			technologies: [...(selectedProject.technologies || [])].filter((t) => t.trim() !== ''),
			url: selectedProject.url,
			github_url: selectedProject.github_url,
			start_date: selectedProject.start_date,
			end_date: selectedProject.end_date,
			role: selectedProject.role,
			key_achievements: [...(selectedProject.key_achievements || [])].filter((a) => a.trim() !== '')
		};

		if (isEditMode && editIndex >= 0) {
			// Update existing project
			$formData.projects = $formData.projects.map((project: Project, i: number) => {
				if (i === editIndex) {
					return projectData;
				}
				return project;
			});
		} else {
			// Add new project
			$formData.projects = [...$formData.projects, projectData];
		}

		// Reset state
		isEditMode = false;
		editIndex = -1;
	}
</script>

<Accordion.Item value="projects">
	<Accordion.Trigger>
		<h3 class="text-2xl font-semibold">Projects</h3>
	</Accordion.Trigger>
	<Accordion.Content>
		{#if $formData.projects && $formData.projects.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each $formData.projects as project, i}
					<Card.Root class="relative">
						<div class="absolute right-2 top-2 z-10 flex gap-1">
							<Button variant="ghost" size="icon" class="h-8 w-8" onclick={() => startEditMode(i)}>
								<Pencil class="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" class="h-8 w-8" onclick={() => deleteProject(i)}>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
						<Card.Header>
							<Card.Title>{project.name}</Card.Title>
							{#if project.role}
								<Card.Description>{project.role}</Card.Description>
							{/if}
						</Card.Header>
						<Card.Content>
							{#if project.description}
								<p class="mb-2">{project.description}</p>
							{/if}

							{#if project.start_date || project.end_date}
								<div class="mb-2 text-sm text-muted-foreground">
									<span>{project.start_date || 'N/A'} - {project.end_date || 'Present'}</span>
								</div>
							{/if}

							{#if project.technologies && project.technologies.length > 0}
								<div class="mb-2">
									<p class="text-sm font-medium">Technologies:</p>
									<div class="flex flex-wrap gap-1">
										{#each project.technologies as tech}
											{#if tech}
												<span class="rounded-md bg-muted px-2 py-1 text-xs">{tech}</span>
											{/if}
										{/each}
									</div>
								</div>
							{/if}

							{#if project.key_achievements && project.key_achievements.length > 0}
								<div>
									<p class="text-sm font-medium">Key Achievements:</p>
									<ul class="ml-5 list-disc text-sm">
										{#each project.key_achievements as achievement}
											{#if achievement}
												<li>{achievement}</li>
											{/if}
										{/each}
									</ul>
								</div>
							{/if}
						</Card.Content>
						<Card.Footer>
							<div class="flex gap-2">
								{#if project.url}
									<a href={project.url} target="_blank"> Live Demo </a>
								{/if}
								{#if project.github_url}
									<a href={project.github_url} target="_blank"> GitHub </a>
								{/if}
							</div>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-muted-foreground">No projects added.</p>
		{/if}

		<Sheet.Root bind:open={sheetOpen}>
			<Sheet.Trigger
				type="button"
				class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
				onclick={startAddMode}>Add Project</Sheet.Trigger
			>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>{isEditMode ? 'Edit' : 'Add'} Project</Sheet.Title>
					<Sheet.Description
						>{isEditMode ? 'Update' : 'Add'} details about your project.</Sheet.Description
					>
				</Sheet.Header>
				<ScrollArea class="flex-1">
					<div class="grid gap-4 py-4">
						<div class="space-y-2">
							<Label for="name" class="text-right">Project Name</Label>
							<Input id="name" bind:value={selectedProject.name} />
						</div>

						<div class="space-y-2">
							<Label for="role" class="text-right">Your Role</Label>
							<Input id="role" bind:value={selectedProject.role} />
						</div>

						<div class="space-y-2">
							<Label for="description" class="text-right">Description</Label>
							<Textarea id="description" bind:value={selectedProject.description} />
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="start_date" class="text-right">Start Date</Label>
								<Input id="start_date" bind:value={selectedProject.start_date} />
							</div>
							<div class="space-y-2">
								<Label for="end_date" class="text-right">End Date</Label>
								<Input id="end_date" bind:value={selectedProject.end_date} />
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="url" class="text-right">Live URL</Label>
								<Input id="url" bind:value={selectedProject.url} />
							</div>
							<div class="space-y-2">
								<Label for="github_url" class="text-right">GitHub URL</Label>
								<Input id="github_url" bind:value={selectedProject.github_url} />
							</div>
						</div>

						<div class="space-y-2">
							<Label class="text-right">Technologies Used</Label>
							{#each selectedProject.technologies as tech, i}
								<div class="flex items-center gap-2">
									<Input
										bind:value={selectedProject.technologies[i]}
										placeholder={`Technology ${i + 1}`}
									/>
									{#if i === selectedProject.technologies.length - 1}
										<Button
											variant="outline"
											size="sm"
											onclick={() => {
												selectedProject.technologies = [...selectedProject.technologies, ''];
											}}>+</Button
										>
									{/if}
								</div>
							{/each}
						</div>

						<div class="space-y-2">
							<Label class="text-right">Key Achievements</Label>
							{#each selectedProject.key_achievements as achievement, i}
								<div class="flex items-center gap-2">
									<Input
										bind:value={selectedProject.key_achievements[i]}
										placeholder={`Achievement ${i + 1}`}
									/>
									{#if i === selectedProject.key_achievements.length - 1}
										<Button
											variant="outline"
											size="sm"
											onclick={() => {
												selectedProject.key_achievements = [
													...selectedProject.key_achievements,
													''
												];
											}}>+</Button
										>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</ScrollArea>
				<Sheet.Footer>
					<div class="flex w-full justify-end gap-2">
						<Button
							variant="outline"
							onclick={() => {
								sheetOpen = false;
							}}
						>
							Cancel
						</Button>
						<Sheet.Close class={buttonVariants()} onclick={saveProject}>
							{isEditMode ? 'Update' : 'Save'} Project
						</Sheet.Close>
					</div>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</Accordion.Content>
</Accordion.Item>
