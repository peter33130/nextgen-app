import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return json({ message: 'Het is kersts' }, { status: 200 });
};
