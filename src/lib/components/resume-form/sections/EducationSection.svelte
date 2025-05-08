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
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each $formData.education as education, i}
          <Table.Row>
            <Table.Cell class="font-medium">{education.institution}</Table.Cell>
            <Table.Cell>{education.degree}</Table.Cell>
            <Table.Cell>{education.field_of_study}</Table.Cell>
            <Table.Cell>{education.graduation_date}</Table.Cell>
          </Table.Row>
        {/each}
        {#if $formData.education.length === 0}
          <Table.Row>
            <Table.Cell colspan={4} class="text-center">No education history added</Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>

    <Sheet.Root>
      <Sheet.Trigger
        type="button"
        class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
        onclick={() => {
          selectedEducation = {
            institution: '',
            degree: '',
            field_of_study: undefined,
            graduation_date: undefined,
            gpa: undefined,
            honors: [''],
            relevant_courses: ['']
          };
        }}>Add Education</Sheet.Trigger
      >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Education</Sheet.Title>
          <Sheet.Description>Add or update your education history.</Sheet.Description>
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
        </div>
        <Sheet.Footer>
          <Sheet.Close
            class={buttonVariants({ variant: 'outline' })}
            onclick={() => {
              $formData.education = [
                ...$formData.education,
                {
                  institution: selectedEducation.institution,
                  degree: selectedEducation.degree,
                  field_of_study: selectedEducation.field_of_study,
                  graduation_date: selectedEducation.graduation_date,
                  gpa: selectedEducation.gpa,
                  honors: [...(selectedEducation.honors || [])],
                  relevant_courses: [...(selectedEducation.relevant_courses || [])]
                }
              ];
            }}>Save changes</Sheet.Close
          >
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  </Accordion.Content>
</Accordion.Item>