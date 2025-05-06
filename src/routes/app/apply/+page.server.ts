import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	if (!user) {
		redirect(303, '/auth');
	}

	let { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('user_id', user.id)
		.single();

	if (profileError) {
		// No profile, redirect to onboarding
		redirect(303, '/app/onboarding');
	}

	return {
		profile
	};
};
