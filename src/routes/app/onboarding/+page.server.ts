import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '@/components/resume-form/schema';
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

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (!user) {
			return fail(401, {
				form,
				message: 'Unauthorized'
			});
		}

		const { data, error } = await supabase
			.from('profiles')
			.upsert([{ user_id: user.id, resume: form.data }])
			.select();

		if (error) {
			console.error(error);
		} else {
			return redirect(302, '/app/resume');
		}

		return {
			form
		};
	}
};
