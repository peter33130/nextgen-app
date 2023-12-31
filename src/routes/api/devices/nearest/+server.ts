import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { nearbySort } from '$lib/sort-coordinates';
import database from '$lib/server/database';
import type { NearestDeviceAPIResponse } from '$lib/types';
export const POST: RequestHandler = async ({ request }) => {
	const input = (await request.json()) as { latitude: number; longitude: number };
	const devices: { name: string; emoji: string }[] = [];
	(await database.device.findMany({ select: { name: true, emoji: true } })).forEach((entry) => {
		devices.push({
			name: entry.name || 'unknown',
			emoji: entry.emoji,
		});
	});

	console.log(devices);

	const sorted = await nearbySort(
		{
			lat: input.latitude,
			long: input.longitude,
		},
		devices
	);

	return json({
		success: true,
		devices: sorted,
	} as NearestDeviceAPIResponse);
};
