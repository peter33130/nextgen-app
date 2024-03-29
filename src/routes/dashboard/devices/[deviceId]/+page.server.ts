import database from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = await fetch('http://localhost:3000/data').then(async (res) => await res.json());

	const db = await database.device.findUnique({
		where: { id: params.deviceId },
	});

	if (!db) redirect(308, '/dashboard/devices');

	return {
		title: `${db.emoji} ${db.name}`,
		advice: {
			color: (() => {
				switch (data!.risk) {
					case 'HIGH':
						return '#ff3b30';
					case 'MODERATE':
						return '#ffcc00';
					case 'LOW':
						return '#34c759';
					default:
						return '#000';
				}
			})(),
			description: (() => {
				switch (data!.risk) {
					case 'HIGH':
						return 'Do not swim in this water. Swimming here can result in injuries or even death.';
					case 'MODERATE':
						return 'Please be careful when swimming here because some measurements are not optimal.';
					case 'LOW':
						return 'You can swim here safely. Make sure to always keep an eye open for unexpectancies.';
					default:
						return 'At this moment we are not sure if this water is safe for you to swim in.';
				}
			})(),
		},
		measurements: {
			ph: data!.ph,
			tds: data!.tds,
			turbidity: data!.turbidity,
			waterTemperature: data!.waterTemperature,
		},
		gps: `https://www.google.com/maps/@${data!.lat},${data!.long},18z`,
		battery: data?.batteryLevel,
	};
};
