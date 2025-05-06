import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Workaround for TypeScript errors with the SvelteKit vite plugin
// @ts-ignore
export default defineConfig({
	// @ts-ignore
	plugins: [sveltekit()]
});
