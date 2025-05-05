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
		const user = event.locals.user;
		const supabase = event.locals.supabase;
		const form = await superValidate(event, zod(formSchema));

		console.log(JSON.stringify(form, null, 4));

		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			const { data, error } = await supabase
				.from('profiles')
				.upsert([{ user_id: user.id, resume: form.data }])
				.select();

			if (error) {
				console.error(error);
			} else {
				console.log('User profile updated successfully', data);
			}
		}

		return {
			form
		};
	}
};
