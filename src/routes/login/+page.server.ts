import type { RegisterAPIResponse } from '$lib/types';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
	const token = cookies.get('token');
	if (token) redirect(308, '/dashboard');
};

export const actions = {
	login: async ({ request, fetch }): Promise<RegisterAPIResponse> => {
		const formData = await request.formData();

		// get data from form
		const email = formData.get('email');
		const password = formData.get('password');
		// make api call
		const response: RegisterAPIResponse = await fetch('/api/auth/login', {
			method: 'post',
			body: JSON.stringify({
				email,
				password,
			}),
		}).then(async (res) => await res.json());

		// redirect when register is valid
		if (response.success) return redirect(308, '/activate');

		return response;
	},
} satisfies Actions;
