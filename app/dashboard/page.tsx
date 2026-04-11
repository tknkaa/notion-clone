import { headers } from "next/headers";
import { auth } from "../lib/auth";

//TODO: check user
export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	console.log(session);
	return <h1>Dashboard</h1>;
}
