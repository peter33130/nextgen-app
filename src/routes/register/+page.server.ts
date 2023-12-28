import type { RegisterAPIResponse } from '$lib/types';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, fetch }): Promise<RegisterAPIResponse> => {
		const formData = await request.formData();

		// get data from form
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');

		// make api call
		const response: RegisterAPIResponse = await fetch('/api/auth/register', {
			method: 'post',
			body: JSON.stringify({
				name,
				email,
				password,
				confirmPassword,
			}),
		}).then(async (res) => await res.json());

		// redirect when register is valid
		if (response.success) return redirect(308, '/activate');

		return response;
	},
} satisfies Actions;
