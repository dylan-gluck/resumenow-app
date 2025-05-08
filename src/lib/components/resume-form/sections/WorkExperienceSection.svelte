<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import * as Table from "@/components/ui/table";
  import * as Sheet from "@/components/ui/sheet";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { Switch } from "@/components/ui/switch";
  import { type SuperForm } from "sveltekit-superforms";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";
  import type { WorkExperience } from "@/types/resume";
  import { Pencil, Trash2 } from 'lucide-svelte';

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();

  // State for managing work experience entries
  const newWorkExperience: WorkExperience = {
    company: '',
    position: '',
    start_date: undefined,
    end_date: undefined,
    is_current: false,
    responsibilities: [''],
    technologies: ['']
  };
  
  let selectedWorkExperience = $state<WorkExperience>({
    company: newWorkExperience.company,
    position: newWorkExperience.position,
    start_date: newWorkExperience.start_date,
    end_date: newWorkExperience.end_date,
    is_current: newWorkExperience.is_current,
    responsibilities: [...(newWorkExperience.responsibilities || [])],
    technologies: [...(newWorkExperience.technologies || [])]
  });

  // State for edit mode
  let isEditMode = $state(false);
  let editIndex = $state(-1);
  let sheetOpen = $state(false);

  // Method to reset the selected work experience
  function resetSelectedWorkExperience() {
    selectedWorkExperience = {
      company: '',
      position: '',
      start_date: undefined,
      end_date: undefined,
      is_current: false,
      responsibilities: [''],
      technologies: ['']
    };
  }

  // Start add mode
  function startAddMode() {
    isEditMode = false;
    editIndex = -1;
    resetSelectedWorkExperience();
    sheetOpen = true;
  }

  // Start edit mode
  function startEditMode(index: number) {
    isEditMode = true;
    editIndex = index;
    
    // Clone the selected work experience to avoid direct mutation
    const experience = $formData.work_experience[index];
    selectedWorkExperience = {
      company: experience.company,
      position: experience.position,
      start_date: experience.start_date || '',
      end_date: experience.end_date || '',
      is_current: experience.is_current || false,
      responsibilities: experience.responsibilities ? [...experience.responsibilities] : [''],
      technologies: experience.technologies ? [...experience.technologies] : ['']
    };
    
    sheetOpen = true;
  }

  // Delete work experience
  function deleteWorkExperience(index: number) {
    if (!$formData.work_experience) return;
    
    $formData.work_experience = $formData.work_experience.filter((_, i) => i !== index);
  }

  // Method to save work experience to the form
  function saveWorkExperience() {
    if (!$formData.work_experience) {
      $formData.work_experience = [];
    }

    const experienceData = {
      company: selectedWorkExperience.company,
      position: selectedWorkExperience.position,
      start_date: selectedWorkExperience.start_date,
      end_date: selectedWorkExperience.end_date,
      is_current: selectedWorkExperience.is_current,
      responsibilities: [...(selectedWorkExperience.responsibilities || [])].filter(r => r.trim() !== ''),
      technologies: [...(selectedWorkExperience.technologies || [])].filter(t => t.trim() !== '')
    };

    if (isEditMode && editIndex >= 0) {
      // Update existing work experience
      $formData.work_experience = $formData.work_experience.map((experience, i) => {
        if (i === editIndex) {
          return experienceData;
        }
        return experience;
      });
    } else {
      // Add new work experience
      $formData.work_experience = [
        ...$formData.work_experience,
        experienceData
      ];
    }

    // Reset state
    isEditMode = false;
    editIndex = -1;
  }
</script>

<Accordion.Item value="work_experience">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Work Experience</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Company</Table.Head>
          <Table.Head>Position</Table.Head>
          <Table.Head>Period</Table.Head>
          <Table.Head>Current</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each $formData.work_experience as experience, i}
          <Table.Row>
            <Table.Cell class="font-medium">{experience.company}</Table.Cell>
            <Table.Cell>{experience.position}</Table.Cell>
            <Table.Cell>
              {experience.start_date} - {experience.is_current
                ? 'Present'
                : experience.end_date}
            </Table.Cell>
            <Table.Cell>{experience.is_current ? 'Yes' : 'No'}</Table.Cell>
            <Table.Cell class="text-right">
              <div class="flex justify-end gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  class="h-8 w-8" 
                  onclick={() => startEditMode(i)}
                >
                  <Pencil class="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  class="h-8 w-8" 
                  onclick={() => deleteWorkExperience(i)}
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if $formData.work_experience.length === 0}
          <Table.Row>
            <Table.Cell colspan={5} class="text-center">No work experience added</Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>

    <Sheet.Root bind:open={sheetOpen}>
      <Sheet.Trigger
        type="button"
        class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
        onclick={startAddMode}>Add Work Experience</Sheet.Trigger
      >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{isEditMode ? 'Edit' : 'Add'} Work Experience</Sheet.Title>
          <Sheet.Description>{isEditMode ? 'Update' : 'Add'} details about your work history.</Sheet.Description>
        </Sheet.Header>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <Label for="company" class="text-right">Company</Label>
            <Input id="company" bind:value={selectedWorkExperience.company} />
          </div>
          <div class="space-y-2">
            <Label for="position" class="text-right">Position</Label>
            <Input id="position" bind:value={selectedWorkExperience.position} />
          </div>
          <div class="space-y-2">
            <Label for="start_date" class="text-right">Start Date</Label>
            <Input id="start_date" bind:value={selectedWorkExperience.start_date} />
          </div>
          <div class="flex items-center justify-between space-y-0 py-2">
            <Label for="is_current" class="text-right">Current Position</Label>
            <Switch id="is_current" bind:checked={selectedWorkExperience.is_current} />
          </div>
          {#if !selectedWorkExperience.is_current}
            <div class="space-y-2">
              <Label for="end_date" class="text-right">End Date</Label>
              <Input id="end_date" bind:value={selectedWorkExperience.end_date} />
            </div>
          {/if}
          <div class="space-y-2">
            <Label class="text-right">Responsibilities</Label>
            {#each selectedWorkExperience.responsibilities as responsibility, i}
              <div class="flex items-center gap-2">
                <Input
                  bind:value={selectedWorkExperience.responsibilities[i]}
                  placeholder={`Responsibility ${i + 1}`}
                />
                {#if i === selectedWorkExperience.responsibilities.length - 1}
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => {
                      selectedWorkExperience.responsibilities = [
                        ...selectedWorkExperience.responsibilities,
                        ''
                      ];
                    }}>+</Button
                  >
                {/if}
              </div>
            {/each}
          </div>
          <div class="space-y-2">
            <Label class="text-right">Technologies</Label>
            {#each selectedWorkExperience.technologies ?? [''] as technology, i}
              <div class="flex items-center gap-2">
                <Input
                  bind:value={selectedWorkExperience.technologies![i]}
                  placeholder={`Technology ${i + 1}`}
                />
                {#if i === (selectedWorkExperience.technologies ?? []).length - 1}
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => {
                      selectedWorkExperience.technologies = [
                        ...(selectedWorkExperience.technologies || []),
                        ''
                      ];
                    }}>+</Button
                  >
                {/if}
              </div>
            {/each}
          </div>
        </div>
        <Sheet.Footer>
          <div class="flex w-full justify-between">
            <Button 
              variant="outline" 
              onclick={() => {
                sheetOpen = false;
              }}
            >
              Cancel
            </Button>
            <Sheet.Close
              class={buttonVariants()}
              onclick={saveWorkExperience}
            >
              {isEditMode ? 'Update' : 'Save'} Experience
            </Sheet.Close>
          </div>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  </Accordion.Content>
</Accordion.Item>