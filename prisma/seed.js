import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
const prisma = new PrismaClient();
import Fakerator from 'fakerator';
import bcrypt from 'bcrypt';

if (!process.env.ENCRYPTION_KEY) {
	console.log('No encryption key founded');
	process.exit(0);
}

export function randomEmail(domain) {
	const random = randomBytes(3).toString('hex');
	return `${random}@${domain}`;
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCoordinate(min, max) {
	return Math.random() * (max - min) + min;
}

function generateRandomCoordinates() {
	// Define the bounding box for the Netherlands
	const netherlandsBoundingBox = {
		minLat: 50.75,
		maxLat: 53.3594,
		minLong: 3.0711,
		maxLong: 7.2079,
	};

	// Generate random latitude and longitude within the bounding box
	const randomLat = getRandomCoordinate(netherlandsBoundingBox.minLat, netherlandsBoundingBox.maxLat);
	const randomLong = getRandomCoordinate(netherlandsBoundingBox.minLong, netherlandsBoundingBox.maxLong);

	return { latitude: randomLat, longitude: randomLong };
}

async function main() {
	const users = [];

	console.log('Users:');
	for (let i = 0; i < 9; i++) {
		const id = randomBytes(4).toString('hex');
		const email = randomEmail('yahoo.com');
		const name = Fakerator('nl-NL').names.name();
		const password = 'Wachtwoord123!';

		users.push(
			await prisma.user.create({
				data: {
					id,
					email,
					name,
					password: await bcrypt.hash(password, await bcrypt.genSalt()),
				},
			})
		);

		console.log(id, email, name, password);
	}

	console.log('Devices:');
	for (const user of users) {
		const times = randomIntFromInterval(0, 3);

		for (let i = 0; i < times; i++) {
			const id = randomBytes(4).toString('hex');
			const name = `Boei van ${user.id}-${randomIntFromInterval(0, 1)}`;

			const cords = generateRandomCoordinates();

			await prisma.device.create({
				data: {
					id,
					name,
					lat: cords.latitude,
					long: cords.longitude,
					emoji: ['🥱', '😪', '🤐', '😄', '👌', '👨‍🦲'][randomIntFromInterval(0, 5)],
					accessKey: 'not-implemented',
					ownerId: user.id,
				},
			});

			console.log(id, name);
		}
	}
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
