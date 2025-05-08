<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import * as Table from "@/components/ui/table";
  import * as Sheet from "@/components/ui/sheet";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { type SuperForm } from "sveltekit-superforms";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";
  import type { Education } from "@/types/resume";
  import { Pencil, Trash2 } from 'lucide-svelte';

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();

  // State for managing education entries
  const newEducation: Education = {
    institution: '',
    degree: '',
    field_of_study: undefined,
    graduation_date: undefined,
    gpa: undefined,
    honors: [''],
    relevant_courses: ['']
  };
  
  let selectedEducation = $state<Education>({
    institution: newEducation.institution,
    degree: newEducation.degree,
    field_of_study: newEducation.field_of_study,
    graduation_date: newEducation.graduation_date,
    gpa: newEducation.gpa,
    honors: [...(newEducation.honors || [])],
    relevant_courses: [...(newEducation.relevant_courses || [])]
  });

  // State for edit mode
  let isEditMode = $state(false);
  let editIndex = $state(-1);
  let sheetOpen = $state(false);

  // Method to reset the selected education
  function resetSelectedEducation() {
    selectedEducation = {
      institution: '',
      degree: '',
      field_of_study: undefined,
      graduation_date: undefined,
      gpa: undefined,
      honors: [''],
      relevant_courses: ['']
    };
  }

  // Start add mode
  function startAddMode() {
    isEditMode = false;
    editIndex = -1;
    resetSelectedEducation();
    sheetOpen = true;
  }

  // Start edit mode
  function startEditMode(index: number) {
    isEditMode = true;
    editIndex = index;
    
    // Clone the selected education to avoid direct mutation
    const education = $formData.education[index];
    selectedEducation = {
      institution: education.institution,
      degree: education.degree,
      field_of_study: education.field_of_study || '',
      graduation_date: education.graduation_date || '',
      gpa: education.gpa || undefined,
      honors: education.honors ? [...education.honors] : [''],
      relevant_courses: education.relevant_courses ? [...education.relevant_courses] : ['']
    };
    
    sheetOpen = true;
  }

  // Delete education
  function deleteEducation(index: number) {
    if (!$formData.education) return;
    
    $formData.education = $formData.education.filter((_: Education, i: number) => i !== index);
  }

  // Method to save education to the form
  function saveEducation() {
    if (!$formData.education) {
      $formData.education = [];
    }

    const educationData = {
      institution: selectedEducation.institution,
      degree: selectedEducation.degree,
      field_of_study: selectedEducation.field_of_study,
      graduation_date: selectedEducation.graduation_date,
      gpa: selectedEducation.gpa,
      honors: [...(selectedEducation.honors || [])].filter(h => h.trim() !== ''),
      relevant_courses: [...(selectedEducation.relevant_courses || [])].filter(c => c.trim() !== '')
    };

    if (isEditMode && editIndex >= 0) {
      // Update existing education
      $formData.education = $formData.education.map((education: Education, i: number) => {
        if (i === editIndex) {
          return educationData;
        }
        return education;
      });
    } else {
      // Add new education
      $formData.education = [
        ...$formData.education,
        educationData
      ];
    }

    // Reset state
    isEditMode = false;
    editIndex = -1;
  }
</script>

<Accordion.Item value="education">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Education</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Institution</Table.Head>
          <Table.Head>Degree</Table.Head>
          <Table.Head>Field</Table.Head>
          <Table.Head>Graduated</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each $formData.education as education, i}
          <Table.Row>
            <Table.Cell class="font-medium">{education.institution}</Table.Cell>
            <Table.Cell>{education.degree}</Table.Cell>
            <Table.Cell>{education.field_of_study}</Table.Cell>
            <Table.Cell>{education.graduation_date}</Table.Cell>
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
                  onclick={() => deleteEducation(i)}
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if $formData.education.length === 0}
          <Table.Row>
            <Table.Cell colspan={5} class="text-center">No education history added</Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>

    <Sheet.Root bind:open={sheetOpen}>
      <Sheet.Trigger
        type="button"
        class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
        onclick={startAddMode}>Add Education</Sheet.Trigger
      >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{isEditMode ? 'Edit' : 'Add'} Education</Sheet.Title>
          <Sheet.Description>{isEditMode ? 'Update' : 'Add'} details about your education history.</Sheet.Description>
        </Sheet.Header>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <Label for="institution" class="text-right">Institution</Label>
            <Input id="institution" bind:value={selectedEducation.institution} />
          </div>
          <div class="space-y-2">
            <Label for="degree" class="text-right">Degree</Label>
            <Input id="degree" bind:value={selectedEducation.degree} />
          </div>
          <div class="space-y-2">
            <Label for="field_of_study" class="text-right">Field of Study</Label>
            <Input id="field_of_study" bind:value={selectedEducation.field_of_study} />
          </div>
          <div class="space-y-2">
            <Label for="graduation_date" class="text-right">Graduation Date</Label>
            <Input id="graduation_date" bind:value={selectedEducation.graduation_date} />
          </div>
          <div class="space-y-2">
            <Label for="gpa" class="text-right">GPA</Label>
            <Input
              id="gpa"
              type="number"
              min={0}
              max={4}
              step={0.1}
              bind:value={selectedEducation.gpa}
            />
          </div>
          <div class="space-y-2">
            <Label class="text-right">Honors</Label>
            {#each selectedEducation.honors as honor, i}
              <div class="flex items-center gap-2">
                <Input
                  bind:value={selectedEducation.honors[i]}
                  placeholder={`Honor ${i + 1}`}
                />
                {#if i === selectedEducation.honors.length - 1}
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => {
                      selectedEducation.honors = [
                        ...selectedEducation.honors,
                        ''
                      ];
                    }}>+</Button
                  >
                {/if}
              </div>
            {/each}
          </div>
          <div class="space-y-2">
            <Label class="text-right">Relevant Courses</Label>
            {#each selectedEducation.relevant_courses as course, i}
              <div class="flex items-center gap-2">
                <Input
                  bind:value={selectedEducation.relevant_courses[i]}
                  placeholder={`Course ${i + 1}`}
                />
                {#if i === selectedEducation.relevant_courses.length - 1}
                  <Button
                    variant="outline"
                    size="sm"
                    onclick={() => {
                      selectedEducation.relevant_courses = [
                        ...selectedEducation.relevant_courses,
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
              onclick={saveEducation}
            >
              {isEditMode ? 'Update' : 'Save'} Education
            </Sheet.Close>
          </div>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  </Accordion.Content>
</Accordion.Item>