import { ENCRYPTION_KEY } from '$env/static/private';
import cache from '$lib/server/cache';
import database from '$lib/server/database';
import type { ApiResponseUser } from '$lib/types';
import { checkCredentials, hasSession } from '$lib/utils/auth';
import { type RequestHandler, json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { z } from 'zod';

export const POST: RequestHandler = async ({ cookies, request }) => {
	if (hasSession(cookies)) return json({ message: 'Already signed in' }); // check if user already logged in

	const schema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	type InputBody = z.infer<typeof schema>;
	const body: InputBody = await request.json(); // not validated at initialization
	const results = schema.safeParse(body);
	if (!results.success) {
		return json({ message: results.error.errors[0].message, key: results.error.errors[0].path[0] }, { status: 400 });
	}

	// check if user exists
	const user = await database.user.findUnique({ where: { email: body.email } });
	const sendedVerifyMail = await cache.has(`sended-verify-email/email:${body.email}`);
	if (!user) {
		// edge case where the user tries to login and has registered but did not activate his account
		if (sendedVerifyMail) {
			return json({ success: false, message: 'Make sure to activate your account before you login' });
		}

		return json({ success: false, message: 'The email or password is incorrect' });
	}

	// validate credentials
	if (!(await checkCredentials(body.email, body.password))) {
		return json({ success: false, message: 'The email or password is incorrect' });
	}

	// set token
	const token = jwt.sign({ userId: user.id }, ENCRYPTION_KEY, { expiresIn: '3d' });
	cookies.set('token', token, { httpOnly: true, maxAge: ms('3d') / 1000, path: '/' });

	return json({
		success: true,
		user: {
			id: user.id,
			createdAt: user.createdAt,
			name: user.name,
			email: user.email,
			deactivated: user.deactivated,
			devices: await database.device.findMany({ where: { ownerId: user.id }, select: { id: true } }),
		},
	} satisfies { success: true; user: ApiResponseUser });
};
