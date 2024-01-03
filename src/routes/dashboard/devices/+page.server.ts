import database from '$lib/server/database';
import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = jwt.decode(cookies.get('token')!) as { exp: number; userId: string };

	return {
		devices: await database.device.findMany({
			where: { ownerId: token.userId },
			select: { emoji: true, name: true, updatedAt: true, id: true },
		}),
	};
};
