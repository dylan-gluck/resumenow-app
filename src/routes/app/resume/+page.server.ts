import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '@/components/resume-form/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
	if (!user) {
		redirect(302, '/auth');
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('user_id', user.id)
		.single();

	if (profileError) {
		// No profile, redirect to onboarding
		redirect(303, '/app/onboarding');
	}

	const resume = profile.resume;

	return {
		form: await superValidate(resume, zod(formSchema))
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
			.update({ resume: form.data, updated_at: new Date() })
			.eq('user_id', user.id)
			.select();

		if (error) {
			console.error(error);
		} else {
			console.log('User profile updated successfully', data);
		}

		return {
			form
		};
	}
};
