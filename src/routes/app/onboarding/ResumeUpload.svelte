<script lang="ts">
	import type { Resume } from '@/types/resume';

	let {
		resumeImport = $bindable(),
		isImporting = $bindable()
	}: { resumeImport: Resume; isImporting: boolean } = $props();
</script>

<h3 class="text-lg font-semibold">Upload Resume</h3>
<div
	class="flex min-h-[200px] flex-col items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 p-4"
>
	<span class="text-muted-foreground">Drag and drop your document here</span>
	<span class="text-xs text-muted-foreground">File types accepted: pdf, doc, docx, txt</span>
</div>
