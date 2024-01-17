import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return json({ status: 'active' }, { status: 200 });
};
