import { randomBytes } from 'crypto';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

if (!fs.existsSync('./node_modules')) {
	console.log('Please run npm install');
	process.exit(0);
}

const env = {
	DB_CONNECTION_URL: '',
	ENCRYPTION_KEY: randomBytes(24).toString('hex'),
	BASE_URL: 'http://localhost:5173',
};

if (!fs.existsSync('./.env')) {
	fs.writeFileSync(
		'./.env',
		Object.entries(env)
			.map(([k, v]) => `${k}=${v}`)
			.join('\n')
	);
	console.log('Created .env file');
}

async function npx(cmd) {
	cmd = 'npx ' + cmd;
	console.log(`> ${cmd}`);
	const { stderr, stdout } = await exec(cmd);
	if (stdout) console.log(stdout.toString());
	if (stderr) console.log(stderr.toString());
}

(async () => {
	await npx('prisma generate');
	await npx('prisma migrate dev');
})();
