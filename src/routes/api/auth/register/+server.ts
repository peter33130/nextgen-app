import { z } from 'zod';
import { json, type RequestHandler } from '@sveltejs/kit';
import database from '$lib/server/database';
import { randomBytes } from 'crypto';
import type { CacheUser } from '$lib/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BASE_URL, ENCRYPTION_KEY } from '$env/static/private';
import cache from '$lib/server/cache';
import ms from 'ms';
import { Resend } from 'resend';

const resend = new Resend('re_jYisfoeF_3maPJRr6xLcmZnhGvHKLyZUv');

export const POST: RequestHandler = async ({ request }) => {
	const schema = z.object({
		name: z.string().min(1, 'No name provided').max(50, "A name can't be longer then 50 characters"),
		email: z.string().email(),
		password: z
			.string()
			.min(8, 'A password must be atleast 8 characters long')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
				'Please make sure your password contains one uppercase letter, one lowercase letter, one number and a special character'
			),
		confirmPassword: z.string(),
	});

	type InputBody = z.infer<typeof schema>;
	const body: InputBody = await request.json(); // not validated at initialization
	const results = schema.safeParse(body);
	if (!results.success) {
		return json(
			{ success: false, message: results.error.errors[0].message, key: results.error.errors[0].path[0] },
			{ status: 400 }
		);
	}
	// check if email is already registered
	if (
		(await database.user.findUnique({ where: { email: body.email }, select: { email: true } })) ||
		(await cache.has(`sended-verify-email/email:${body.email}`))
	) {
		return json({ success: false, message: 'This email is already in use' }, { status: 408 });
	}

	// check if passwords match
	if (body.password !== body.confirmPassword)
		return json({ success: false, message: 'Passwords are not matching', key: 'confirmPassword' }, { status: 400 });

	// generate user id
	let userId = randomBytes(4).toString('hex');
	while (await database.user.findUnique({ where: { id: userId }, select: { id: true } })) {
		userId = randomBytes(4).toString('hex');
	}

	const cacheUser: CacheUser = {
		id: userId,
		name: body.name,
		email: body.email,
		password: await bcrypt.hash(body.password, await bcrypt.genSalt()),
	};

	const tempUserCacheKey = `cache/user:${userId}`;
	await cache.set(tempUserCacheKey, cacheUser, ms('10m')); // put user in cache

	// create verification token
	const verifyUrl = `${BASE_URL}/activate?token=${jwt.sign({ userId: userId, email: body.email }, ENCRYPTION_KEY, {
		expiresIn: '10m',
	})}`;

	// send email
	resend.emails
		.send({
			from: 'onboarding@resend.dev',
			to: body.email,
			subject: 'Activate your account',
			html: `Please verify your account by clicking on the link <a href="${verifyUrl}">here</a>.`,
		})
		.catch(async () => await cache.delete(tempUserCacheKey));

	await cache.set(`sended-verify-email/email:${body.email}`, {}, ms('10m')); // keep track of the email we send

	return json({ success: true, message: 'Check your inbox for an activation email' }, { status: 200 });
};
