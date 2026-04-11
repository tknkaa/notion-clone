import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import * as v from "valibot";
import { auth } from "@/app/lib/auth";

type Variables = {
	session: typeof auth.$Infer.Session;
};

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) {
		return c.json(
			{
				error: "unauthorized",
			},
			401,
		);
	}
	c.set("session", session);
	await next();
});

const createPageSchema = v.object({
	title: v.optional(v.string(), "Untitled"),
});

const routes = app.post(
	"/pages",
	sValidator("json", createPageSchema),
	async (c) => {
		const { title } = c.req.valid("json");
		const session = c.get("session");
		//TODO: create team + page
		const teamId = "team";
		const pageId = "page";
		return c.json({
			teamId,
			pageId,
		});
	},
);

export const GET = app.fetch;
export const POST = app.fetch;

export type AppType = typeof routes;
