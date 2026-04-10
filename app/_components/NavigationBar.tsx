"use client";

import { useRouter } from "next/navigation";

export function NavigationBar() {
	const router = useRouter();
	return (
		<>
			<button onClick={() => router.push("/signin")}>go to sign in page</button>
			<button onClick={() => router.push("/signup")}>go to sign up page</button>
		</>
	);
}
