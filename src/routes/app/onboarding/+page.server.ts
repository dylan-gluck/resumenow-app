import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		console.log(JSON.stringify(form, null, 4));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
