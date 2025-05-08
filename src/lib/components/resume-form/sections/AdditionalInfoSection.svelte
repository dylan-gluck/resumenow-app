<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { type SuperForm } from "sveltekit-superforms";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();

  // Local state for add functions
  let newPublicationText = $state('');
  let newConferenceText = $state('');
  let newVolunteerWorkText = $state('');
  let newInterestText = $state('');
  let newReferenceText = $state('');
</script>

<Accordion.Item value="additional">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Additional Information</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <div class="grid gap-6">
      <!-- Publications -->
      <div>
        <h4 class="mb-2 font-medium">Publications</h4>
        {#if $formData.publications && $formData.publications.length > 0}
          <ul class="ml-5 list-disc">
            {#each $formData.publications as publication}
              <li>{publication}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted-foreground">No publications added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input bind:value={newPublicationText} placeholder="Add a publication" />
            <Button
              variant="outline"
              onclick={() => {
                if (newPublicationText) {
                  if (!$formData.publications) {
                    $formData.publications = [];
                  }
                  $formData.publications = [...$formData.publications, newPublicationText];
                  newPublicationText = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <!-- Conferences -->
      <div>
        <h4 class="mb-2 font-medium">Conferences</h4>
        {#if $formData.conferences && $formData.conferences.length > 0}
          <ul class="ml-5 list-disc">
            {#each $formData.conferences as conference}
              <li>{conference}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted-foreground">No conferences added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input bind:value={newConferenceText} placeholder="Add a conference" />
            <Button
              variant="outline"
              onclick={() => {
                if (newConferenceText) {
                  if (!$formData.conferences) {
                    $formData.conferences = [];
                  }
                  $formData.conferences = [...$formData.conferences, newConferenceText];
                  newConferenceText = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div>
        <h4 class="mb-2 font-medium">Languages</h4>
        {#if $formData.languages && $formData.languages.length > 0}
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.languages as language}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{language.name}</div>
                {#if language.level}
                  <div class="text-sm text-muted-foreground">Proficiency: {language.level}</div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-sm text-muted-foreground">No languages added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input placeholder="Language name" id="language_name" />
            <select
              id="language_level"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Proficiency level</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Proficient">Proficient</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            <Button
              variant="outline"
              onclick={() => {
                const name = (document.getElementById('language_name') as HTMLInputElement)
                  .value;
                const level = (document.getElementById('language_level') as HTMLSelectElement)
                  .value;

                if (name) {
                  if (!$formData.languages) {
                    $formData.languages = [];
                  }
                  $formData.languages = [...$formData.languages, { name, level }];
                  (document.getElementById('language_name') as HTMLInputElement).value = '';
                  (document.getElementById('language_level') as HTMLSelectElement).value = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <!-- Volunteer Work -->
      <div>
        <h4 class="mb-2 font-medium">Volunteer Work</h4>
        {#if $formData.volunteer_work && $formData.volunteer_work.length > 0}
          <ul class="ml-5 list-disc">
            {#each $formData.volunteer_work as work}
              <li>{work}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted-foreground">No volunteer work added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input bind:value={newVolunteerWorkText} placeholder="Add volunteer work" />
            <Button
              variant="outline"
              onclick={() => {
                if (newVolunteerWorkText) {
                  if (!$formData.volunteer_work) {
                    $formData.volunteer_work = [];
                  }
                  $formData.volunteer_work = [
                    ...$formData.volunteer_work,
                    newVolunteerWorkText
                  ];
                  newVolunteerWorkText = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <!-- Interests -->
      <div>
        <h4 class="mb-2 font-medium">Interests</h4>
        {#if $formData.interests && $formData.interests.length > 0}
          <ul class="ml-5 list-disc">
            {#each $formData.interests as interest}
              <li>{interest}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted-foreground">No interests added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input bind:value={newInterestText} placeholder="Add an interest" />
            <Button
              variant="outline"
              onclick={() => {
                if (newInterestText) {
                  if (!$formData.interests) {
                    $formData.interests = [];
                  }
                  $formData.interests = [...$formData.interests, newInterestText];
                  newInterestText = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <!-- References -->
      <div>
        <h4 class="mb-2 font-medium">References</h4>
        {#if $formData.references && $formData.references.length > 0}
          <ul class="ml-5 list-disc">
            {#each $formData.references as reference}
              <li>{reference}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted-foreground">No references added.</p>
        {/if}
        <div class="mt-2">
          <div class="flex gap-2">
            <Input bind:value={newReferenceText} placeholder="Add a reference" />
            <Button
              variant="outline"
              onclick={() => {
                if (newReferenceText) {
                  $formData.references = [...$formData.references, newReferenceText];
                  newReferenceText = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Accordion.Content>
</Accordion.Item>