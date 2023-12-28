import { createTransport } from 'nodemailer';
import { MAIL_PASSWORD, MAIL_USER } from '$env/static/private';

export default (() =>
	createTransport({
		name: 'www.example.com',
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: true,
		auth: {
			user: MAIL_USER,
			pass: MAIL_PASSWORD,
		},
	}))();
