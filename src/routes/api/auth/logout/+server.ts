import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) return json({ success: false, message: 'Not logged in' }, { status: 401 });
	cookies.delete('token', { path: '/' });
	return json({ success: true, message: 'Logged out' }, { status: 200 });
};
