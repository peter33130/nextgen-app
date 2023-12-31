import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	// check if token is in cookies, we will later validate below
	const token = cookies.get('token');
	if (!token) throw redirect(308, '/login');
};
