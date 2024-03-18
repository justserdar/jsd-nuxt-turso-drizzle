import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { GitHub, Google } from "arctic";

import type { DatabaseUser } from "./db";

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new BetterSqlite3Adapter(db, {
	user: "user",
	session: "session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !import.meta.dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			githubId: attributes.github_id
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;
	}
}

const config = useRuntimeConfig();

export const github = new GitHub(process.env.GITHUB_CLIENT_ID as string, process.env.GITHUB_CLIENT_SECRET as string);
export const google = new Google(config.googleClientId, config.googleClientSecret, config.googleRedirectUrl);
