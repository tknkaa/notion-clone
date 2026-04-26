"use client";

import { useRouter } from "next/navigation";

export function NavigationBar() {
	const router = useRouter();
	return (
		<button onClick={() => router.push("/login")} type="button">
			Log In
		</button>
	);
}
