import { TiptapPlayground } from "./TiptapPlayground";

export default function Page() {
	return (
		<main className="flex flex-col gap-4 p-6">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<TiptapPlayground />
		</main>
	);
}
