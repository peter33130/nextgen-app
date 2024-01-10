import database from '$lib/server/database';
import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';

export const load: PageServerLoad = async ({ cookies }) => {
	// decode token
	const token = jwt.decode(cookies.get('token')!) as { exp: number; userId: string };

	const user = await database.user.findUnique({ where: { id: token.userId } });

	return {
		name: user!.name,
		email: user!.email,
	};
};
