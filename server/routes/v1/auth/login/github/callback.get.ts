// server/routes/login/github/callback.get.ts
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { eq } from 'drizzle-orm'
import { user } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const code = query.code?.toString() ?? null;
	const state = query.state?.toString() ?? null;
	const storedState = getCookie(event, "github_oauth_state") ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		throw createError({
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		// Replace this with your own DB client.
		const [existingUser] = await orm.select({ id: user.id }).from(user).where(eq(user.github_id, githubUser.id))

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {})
			appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
			return sendRedirect(event, '/')
		  }

		const userId = generateId(15);

		// Replace this with your own DB client.
		await orm.insert(user).values({
			id: userId,
			github_id: githubUser.id,
			username: githubUser.login,
		  })

		const session = await lucia.createSession(userId, {});
		appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		return sendRedirect(event, "/");
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// invalid code
			throw createError({
				status: 400
			});
		}
		throw createError({
			status: 500
		});
	}
});

interface GitHubUser {
	id: string;
	login: string;
}