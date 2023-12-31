import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface ActivateAccountAPIResponse {
	success: boolean;
	message: string;
	noToken?: boolean;
}

export const load: PageServerLoad = async ({ fetch, url, cookies }): Promise<ActivateAccountAPIResponse> => {
	// check if user is already logged in
	const userLoggedIn = !!cookies.get('token');
	if (userLoggedIn) throw redirect(308, '/dashboard');

	const token = url.searchParams.get('token');
	if (!token) return { success: false, noToken: true, message: '' }; // check if token is given in queryparameters

	return (await fetch(`/api/auth/activate?token=${token}`, {
		method: 'post',
	}).then(async (res) => await res.json())) as ActivateAccountAPIResponse;
};
