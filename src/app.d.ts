// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		namespace Lucia {
			type Auth = import('$lib/server/lucia').Auth;
			type DatabaseUserAttributes = {
				email: string;
				email_verified: boolean;
			};
			type DatabaseSessionAttributes = object;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
