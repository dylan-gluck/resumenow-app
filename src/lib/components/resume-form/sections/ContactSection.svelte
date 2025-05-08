<script lang="ts">
  import * as Accordion from "@/components/ui/accordion";
  import { type SuperForm } from "sveltekit-superforms";
  import { TextField } from "../fields";
  import type { FormSchema } from "../schema";
  import type { Infer } from "sveltekit-superforms";

  let { form, formData }: { 
    form: SuperForm<Infer<FormSchema>>;
    formData: any; // The bound form data from the parent
  } = $props();
</script>

<Accordion.Item value="contact">
  <Accordion.Trigger>
    <h3 class="text-2xl font-semibold">Contact Information</h3>
  </Accordion.Trigger>
  <Accordion.Content>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TextField 
        {form} 
        field="contact_info.full_name" 
        label="Full Name" 
      />
      
      <TextField 
        {form} 
        field="contact_info.email" 
        label="Email" 
        type="email" 
      />
      
      <TextField 
        {form} 
        field="contact_info.phone" 
        label="Phone" 
      />
      
      <TextField 
        {form} 
        field="contact_info.address" 
        label="Address" 
      />
      
      <TextField 
        {form} 
        field="contact_info.linkedin" 
        label="LinkedIn URL" 
      />
      
      <TextField 
        {form} 
        field="contact_info.github" 
        label="GitHub URL" 
      />
      
      <TextField 
        {form} 
        field="contact_info.portfolio" 
        label="Portfolio URL" 
      />
      
      <TextField 
        {form} 
        field="contact_info.google_scholar" 
        label="Google Scholar URL" 
      />
    </div>
  </Accordion.Content>
</Accordion.Item>