import { sValidator } from "@hono/standard-validator";
import { generateId } from "better-auth";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import * as v from "valibot";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { page, team, teamMember } from "@/app/lib/db/schema";

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

const routes = app
	.post("/pages", sValidator("json", createPageSchema), async (c) => {
		const { title } = c.req.valid("json");
		const session = c.get("session");
		const userId = session.user.id;
		const teamId = generateId();
		const pageId = generateId();
		await db.batch([
			db.insert(team).values({ id: teamId, name: "My Team" }),
			db.insert(teamMember).values({ teamId, userId, role: "admin" }),
			db.insert(page).values({ id: pageId, teamId, title }),
		]);
		return c.json({
			teamId,
			pageId,
		});
	})
	.get("/pages/last-visited", async (c) => {
		const session = c.get("session");
		const userId = session.user.id;

		const result = await db
			.select({ id: page.id, teamId: page.teamId })
			.from(page)
			.innerJoin(team, eq(page.teamId, team.id))
			.innerJoin(teamMember, eq(team.id, teamMember.teamId))
			.where(eq(teamMember.userId, userId))
			.orderBy(desc(page.updatedAt))
			.limit(1);
		if (result.length === 0) {
			return c.json({ error: "No pages found" }, 404);
		}
		return c.json({ teamId: result[0].teamId, pageId: result[0].id });
	});

export const GET = app.fetch;
export const POST = app.fetch;

export type AppType = typeof routes;
