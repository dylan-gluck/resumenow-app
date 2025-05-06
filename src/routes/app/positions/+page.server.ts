import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
	if (!user) {
		redirect(302, '/auth');
	}

	const { data: positions, error } = await supabase
		.from('resumes')
		.select('*')
		.eq('user_id', user.id);

	if (error) {
		redirect(302, '/app/apply');
	}

	return {
		positions
	};
};
