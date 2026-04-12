"use client";
import { GoogleSigninButton } from "@/app/_components/GoogleSigninButton";
import { authClient } from "@/app/lib/auth-client";
import { client } from "@/app/lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async () => {
		await authClient.signIn.email(
			{
				email: email,
				password: password,
			},
			{
				onRequest: (_ctx) => {
					setIsLoading(true);
				},
				onSuccess: async (_ctx) => {
					const res = await client.api.pages["last-visited"].$get();
					setIsLoading(false);
					if (!res.ok) {
						alert("Try again");
						return;
					}
					const { teamId, pageId } = await res.json();
					router.push(`/${teamId}/${pageId}`);
				},
				onError: (ctx) => {
					setIsLoading(false);
					alert(ctx.error.message);
				},
			},
		);
	};
	return (
		<>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="text"
				placeholder="email"
			/>
			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="password"
			/>
			<button type="button" onClick={handleSubmit}>
				Sign in
			</button>
			{isLoading && <div>signing in...</div>}
			<GoogleSigninButton />
		</>
	);
}
