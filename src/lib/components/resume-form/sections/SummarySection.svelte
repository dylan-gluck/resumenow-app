<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import { type SuperForm } from "sveltekit-superforms";
  import { TextareaField } from "../fields";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();
</script>

<Accordion.Item value="summary">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Summary</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <TextareaField 
      {form} 
      field="summary" 
      label="Professional Summary" 
      rows={5}
    />
  </Accordion.Content>
</Accordion.Item>