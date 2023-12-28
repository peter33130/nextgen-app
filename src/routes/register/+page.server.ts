import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const res = await fetch('/api/auth/register', {
			method: 'post',
			body: JSON.stringify({
				name: data.get('name'),
				email: data.get('email'),
				password: data.get('password'),
				confirmPassword: data.get('confirm-password'),
			}),
		});

		const json = await res.json();
		if (!json.success) return json;

		return { success: true };
	},
} satisfies Actions;
