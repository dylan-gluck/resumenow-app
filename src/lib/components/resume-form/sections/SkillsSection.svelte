<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import * as Sheet from "@/components/ui/sheet";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { type SuperForm } from "sveltekit-superforms";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";
  import type { Skill } from "@/types/resume";

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();

  // State for managing skills
  const newSkill: Skill = {
    name: '',
    level: undefined,
    years_of_experience: undefined
  };
  
  let selectedSkill = $state<Skill & { category: string }>({
    name: newSkill.name,
    level: newSkill.level,
    years_of_experience: newSkill.years_of_experience,
    category: 'programming_languages'
  });

  // Function to add skill to the appropriate category
  function addSkill() {
    const category = selectedSkill.category;
    // Remove the category property before adding to array
    const { category: _, ...skillToAdd } = selectedSkill;

    // Need to handle each category specifically due to TypeScript
    switch (category) {
      case 'programming_languages':
        $formData.technical_skills.programming_languages = [
          ...$formData.technical_skills.programming_languages,
          skillToAdd
        ];
        break;
      case 'frameworks_libraries':
        $formData.technical_skills.frameworks_libraries = [
          ...$formData.technical_skills.frameworks_libraries,
          skillToAdd
        ];
        break;
      case 'databases':
        if (!$formData.technical_skills.databases) {
          $formData.technical_skills.databases = [];
        }
        $formData.technical_skills.databases = [
          ...$formData.technical_skills.databases,
          skillToAdd
        ];
        break;
      case 'tools':
        $formData.technical_skills.tools = [...$formData.technical_skills.tools, skillToAdd];
        break;
      case 'cloud_platforms':
        $formData.technical_skills.cloud_platforms = [
          ...$formData.technical_skills.cloud_platforms,
          skillToAdd
        ];
        break;
      case 'other':
        $formData.technical_skills.other = [...$formData.technical_skills.other, skillToAdd];
        break;
    }

    selectedSkill = {
      name: '',
      level: undefined,
      years_of_experience: undefined,
      category: 'programming_languages'
    };
  }
</script>

<Accordion.Item value="skills">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Technical Skills</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <div class="space-y-6">
      <!-- Programming Languages -->
      <div>
        <h4 class="mb-2 font-medium">Programming Languages</h4>
        {#if $formData.technical_skills.programming_languages.length > 0}
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.programming_languages as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-sm text-muted-foreground">No programming languages added</div>
        {/if}
      </div>

      <!-- Frameworks & Libraries -->
      <div>
        <h4 class="mb-2 font-medium">Frameworks & Libraries</h4>
        {#if $formData.technical_skills.frameworks_libraries.length > 0}
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.frameworks_libraries as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-sm text-muted-foreground">No frameworks or libraries added</div>
        {/if}
      </div>

      <!-- Databases -->
      {#if $formData.technical_skills.databases && $formData.technical_skills.databases.length > 0}
        <div>
          <h4 class="mb-2 font-medium">Databases</h4>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.databases as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Tools -->
      {#if $formData.technical_skills.tools && $formData.technical_skills.tools.length > 0}
        <div>
          <h4 class="mb-2 font-medium">Tools</h4>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.tools as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Cloud Platforms -->
      {#if $formData.technical_skills.cloud_platforms && $formData.technical_skills.cloud_platforms.length > 0}
        <div>
          <h4 class="mb-2 font-medium">Cloud Platforms</h4>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.cloud_platforms as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Other Skills -->
      {#if $formData.technical_skills.other && $formData.technical_skills.other.length > 0}
        <div>
          <h4 class="mb-2 font-medium">Other Skills</h4>
          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each $formData.technical_skills.other as skill}
              <div class="rounded-md border border-border p-2">
                <div class="font-medium">{skill.name}</div>
                {#if skill.level}
                  <div class="text-sm text-muted-foreground">Level: {skill.level}</div>
                {/if}
                {#if skill.years_of_experience}
                  <div class="text-sm text-muted-foreground">
                    Experience: {skill.years_of_experience} years
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <Sheet.Root>
        <Sheet.Trigger
          type="button"
          class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
          onclick={() => {
            selectedSkill = {
              name: '',
              level: undefined,
              years_of_experience: undefined,
              category: 'programming_languages'
            };
          }}>Add Skill</Sheet.Trigger
        >
        <Sheet.Content side="right">
          <Sheet.Header>
            <Sheet.Title>Technical Skill</Sheet.Title>
            <Sheet.Description>Add a new technical skill to your resume.</Sheet.Description>
          </Sheet.Header>
          <div class="grid gap-4 py-4">
            <div class="space-y-2">
              <Label for="skill_category" class="text-right">Category</Label>
              <select
                id="skill_category"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                bind:value={selectedSkill.category}
              >
                <option value="programming_languages">Programming Languages</option>
                <option value="frameworks_libraries">Frameworks & Libraries</option>
                <option value="databases">Databases</option>
                <option value="tools">Tools</option>
                <option value="cloud_platforms">Cloud Platforms</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="space-y-2">
              <Label for="skill_name" class="text-right">Skill Name</Label>
              <Input id="skill_name" bind:value={selectedSkill.name} />
            </div>
            <div class="space-y-2">
              <Label for="skill_level" class="text-right">Skill Level (Optional)</Label>
              <select
                id="skill_level"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                bind:value={selectedSkill.level}
              >
                <option value="">Select a level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div class="space-y-2">
              <Label for="years_of_experience" class="text-right"
                >Years of Experience (Optional)</Label
              >
              <Input
                id="years_of_experience"
                type="number"
                min={0}
                step={1}
                bind:value={selectedSkill.years_of_experience}
              />
            </div>
          </div>
          <Sheet.Footer>
            <Sheet.Close class={buttonVariants({ variant: 'outline' })} onclick={addSkill}>
              Save Skill
            </Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    </div>
  </Accordion.Content>
</Accordion.Item>