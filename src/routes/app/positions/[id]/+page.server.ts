import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, params }) => {
	const { id } = params;

	let { data: position, error: positionError } = await supabase
		.from('resumes')
		.select('*')
		.eq('id', id)
		.single();

	if (positionError) {
		return error(404, positionError.message);
	}

	return {
		position
	};
};
