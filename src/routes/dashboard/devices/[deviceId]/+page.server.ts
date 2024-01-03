import database from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		data: await database.device.findUnique({
			where: { id: params.deviceId },
			select: {
				batteryLevel: true,
				emoji: true,
				name: true,
				lat: true,
				long: true,
				ph: true,
				tds: true,
				turbidity: true,
				waterTemperature: true,
				risk: true,
			},
		}),
	};
};
