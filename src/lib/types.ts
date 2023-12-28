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
	deactivated: boolean;
	deactivationDate?: boolean;
	devices: { id: string }[];
}
