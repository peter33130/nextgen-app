import sentry from '$lib/sentry';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, event }) => {
	const uuid = crypto.randomUUID();
	sentry.captureException(error, { contexts: { sveltekit: { event, uuid } } });
	return { message: "An unexpected error occured, We're working on it.", uuid };
};
