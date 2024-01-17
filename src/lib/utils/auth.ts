import database from '$lib/server/database';
import type { Cookies } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

/**
 * Check if user has session
 * @param cookies - The cookies object
 */
export function hasSession(cookies: Cookies): boolean {
	const token = cookies.get('token');
	if (!token) return false;
	return true;
}

/**
 * Check credentials
 * @param email - The email
 * @param password - The password
 * @returns
 */
export async function checkCredentials(email: string, password: string): Promise<boolean> {
	const user = await database.user.findUnique({ where: { email }, select: { password: true } });
	if (!user) return false;
	return await bcrypt.compare(password, user.password);
}
