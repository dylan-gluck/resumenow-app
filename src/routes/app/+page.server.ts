import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	if (user) {
		let { data: profile, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('user_id', user.id)
			.single();

		if (error) {
			console.error(error);
			// No profile, redirect to onboarding
			redirect(303, '/app/onboarding');
		} else {
			console.log(profile);
		}

		redirect(303, '/app/dashboard');
	}

	return {};
};
