<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import * as Sheet from "@/components/ui/sheet";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button, buttonVariants } from "@/components/ui/button";
  import { type SuperForm } from "sveltekit-superforms";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";
  import type { Certification } from "@/types/resume";
  import * as Card from "@/components/ui/card";

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();

  // State for managing certification entries
  const newCertification: Certification = {
    name: '',
    issuer: '',
    date_obtained: '',
    expiration_date: '',
    credential_id: ''
  };
  
  let selectedCertification = $state<Certification>({
    name: newCertification.name,
    issuer: newCertification.issuer,
    date_obtained: newCertification.date_obtained,
    expiration_date: newCertification.expiration_date,
    credential_id: newCertification.credential_id
  });

  // Method to reset the selected certification
  function resetSelectedCertification() {
    selectedCertification = {
      name: '',
      issuer: '',
      date_obtained: '',
      expiration_date: '',
      credential_id: ''
    };
  }

  // Method to save a certification to the form
  function saveCertification() {
    if (!$formData.certifications) {
      $formData.certifications = [];
    }
    $formData.certifications = [
      ...$formData.certifications,
      {
        name: selectedCertification.name,
        issuer: selectedCertification.issuer,
        date_obtained: selectedCertification.date_obtained,
        expiration_date: selectedCertification.expiration_date,
        credential_id: selectedCertification.credential_id
      }
    ];
  }
</script>

<Accordion.Item value="certifications">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Certifications</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    {#if $formData.certifications && $formData.certifications.length > 0}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each $formData.certifications as certification}
          <Card.Root>
            <Card.Header>
              <Card.Title>{certification.name}</Card.Title>
              <Card.Description>{certification.issuer}</Card.Description>
            </Card.Header>
            <Card.Content>
              <div class="space-y-1 text-sm">
                {#if certification.date_obtained}
                  <p><span class="font-medium">Date Obtained:</span> {certification.date_obtained}</p>
                {/if}
                {#if certification.expiration_date}
                  <p><span class="font-medium">Expiration Date:</span> {certification.expiration_date}</p>
                {/if}
                {#if certification.credential_id}
                  <p><span class="font-medium">Credential ID:</span> {certification.credential_id}</p>
                {/if}
              </div>
            </Card.Content>
          </Card.Root>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-muted-foreground">No certifications added.</p>
    {/if}

    <Sheet.Root>
      <Sheet.Trigger
        type="button"
        class={buttonVariants({ variant: 'outline' }) + ' mt-4 w-fit'}
        onclick={resetSelectedCertification}>Add Certification</Sheet.Trigger
      >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Add Certification</Sheet.Title>
          <Sheet.Description>Add details about your certifications.</Sheet.Description>
        </Sheet.Header>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <Label for="name" class="text-right">Certification Name</Label>
            <Input id="name" bind:value={selectedCertification.name} />
          </div>

          <div class="space-y-2">
            <Label for="issuer" class="text-right">Issuing Organization</Label>
            <Input id="issuer" bind:value={selectedCertification.issuer} />
          </div>

          <div class="space-y-2">
            <Label for="date_obtained" class="text-right">Date Obtained</Label>
            <Input id="date_obtained" bind:value={selectedCertification.date_obtained} />
          </div>

          <div class="space-y-2">
            <Label for="expiration_date" class="text-right">Expiration Date</Label>
            <Input id="expiration_date" bind:value={selectedCertification.expiration_date} />
          </div>

          <div class="space-y-2">
            <Label for="credential_id" class="text-right">Credential ID</Label>
            <Input id="credential_id" bind:value={selectedCertification.credential_id} />
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close
            class={buttonVariants({ variant: 'outline' })}
            onclick={saveCertification}>Save Certification</Sheet.Close
          >
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  </Accordion.Content>
</Accordion.Item>