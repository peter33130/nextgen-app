export interface CacheUser {
	id: string;
	name: string;
	email: string;
	password: string;
}

export interface IsAuthenticatedOutput {
	inMemory: boolean;
	valid: boolean;
}

export interface ApiResponseUser {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	devices: { id: string }[];
}

export interface RegisterAPIResponse {
	success: boolean;
	message: string;
	key?: 'name' | 'password' | 'email' | 'confirmPassword';
}

export interface NearestDeviceAPIResponse {
	success: boolean;
	devices: { name: string; emoji: string }[];
}
