import { generateCodeVerifier, generateState } from "arctic";


export default defineEventHandler(async (event) => {
const state = generateState();
const codeVerifier = generateCodeVerifier();

const url = await google.createAuthorizationURL(state, codeVerifier);

// store state verifier as cookie
setCookie("state", state, {
	secure: true, // set to false in localhost
	path: "/",
	httpOnly: true,
	maxAge: 60 * 10 // 10 min
});

// store code verifier as cookie
setCookie("code_verifier", codeVerifier, {
	secure: true, // set to false in localhost
	path: "/",
	httpOnly: true,
	maxAge: 60 * 10 // 10 min
});

return sendRedirect(event, url.toString());

})