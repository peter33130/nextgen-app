import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { ENCRYPTION_KEY } from '$env/static/private';
import type { CacheUser } from '$lib/types';
import cache from '$lib/server/cache';
import ms from 'ms';
import database from '$lib/server/database';

export const POST: RequestHandler = async ({ url, cookies }) => {
	const token: InputParam | null = url.searchParams.get('token');

	if (!token || token == 'null') return json({ success: false, message: 'No token provided' });
	const schema = z.string();
	type InputParam = z.infer<typeof schema>;
	const results = schema.safeParse(token);
	if (!results.success) {
		return json(
			{ success: false, message: results.error.errors[0].message, key: results.error.errors[0].path[0] },
			{ status: 400 }
		);
	}

	// check if token has already been used
	const tokenCacheKey = `used-tokens/token:${token}`;
	if (await cache.has(tokenCacheKey)) {
		return json({ succes: false, message: 'Invalid token provided' }, { status: 401 });
	}

	let decoded!: { iss: string; exp: number; userId: string };

	try {
		decoded = jwt.verify(token, ENCRYPTION_KEY) as { iss: string; exp: number; userId: string };
	} catch (error: unknown) {
		// check if token had expired
		if (error instanceof jwt.TokenExpiredError) {
			const response = { success: false, message: 'Token has expired' };
			return json(response, { status: 401 });
		}

		// check for other errors
		if (error instanceof jwt.JsonWebTokenError) {
			const response = { success: false, message: 'Invalid token provided' };
			return json(response, { status: 401 });
		}
	}

	const cacheUser: CacheUser | undefined = await cache.get(`cache/user:${decoded.userId}`);

	if (!cacheUser) throw new Error('Did not found a user in the cache');

	await database.user.create({ data: cacheUser }); // create user
	await cache.set(tokenCacheKey, {}, ms('10m')); // register token to prevent reusing

	// set token
	const authToken = jwt.sign({ userId: cacheUser.id }, ENCRYPTION_KEY, { expiresIn: '3d' });
	cookies.set('token', authToken, { httpOnly: true, maxAge: ms('3d') / 1000, path: '/' });

	return json({ success: true, message: 'User created' }, { status: 201 });
};
