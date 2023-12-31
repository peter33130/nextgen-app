import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// check if token is inside cookies
	const token = cookies.get('token');
	if (!token) throw redirect(308, '/login');

	console.log('check auth');
};
