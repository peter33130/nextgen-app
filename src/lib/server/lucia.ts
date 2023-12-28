import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import database from '$lib/server/database';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: prisma(database),
	middleware: sveltekit(),
	getSessionAttributes: (data) => ({ username: data.username }),
});

export type Auth = typeof auth;
