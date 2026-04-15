"use client";

import { authClient } from "@/app/lib/auth-client";

export default function SocialLoginButtons() {
	const loginWithGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};

	const loginWithGithub = async () => {
		await authClient.signIn.social({
			provider: "github",
			callbackURL: "/dashboard",
		});
	};

	return (
		<>
			<button onClick={loginWithGoogle} type="button">
				continue with Google
			</button>
			<button onClick={loginWithGithub} type="button">
				continue with GitHub
			</button>
		</>
	);
}
