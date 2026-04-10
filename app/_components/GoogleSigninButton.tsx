"use client";

import { authClient } from "../lib/auth-client";

export function GoogleSigninButton() {
	const signIn = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};
	return <button onClick={signIn}>continue with google</button>;
}
