import sentry from '$lib/sentry';
import { randomUUID } from 'crypto';
import type { HandleServerError } from '@sveltejs/kit';

/**
 * Handle unexpected server errors
 */
export const handleErrors: HandleServerError = ({ error, event }) => {
	const uuid = randomUUID();
	sentry.captureException(error, { contexts: { sveltekit: { event, uuid } } });
	return { message: "An unexpected error occured, We're working on it.", uuid };
};
