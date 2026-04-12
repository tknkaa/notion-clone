import { index, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";
export * from "./auth-schema";

export const team = sqliteTable("team", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const teamMember = sqliteTable(
	"team_member",
	{
		teamId: text("team_id")
			.notNull()
			.references(() => team.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: text("role", { enum: ["admin", "member"] })
			.default("member")
			.notNull(),
	},
	(table) => [
		index("team_member_teamId_idx").on(table.teamId),
		index("team_member_userId_idx").on(table.userId),
	],
);

export const page = sqliteTable(
	"page",
	{
		id: text("id").primaryKey(),
		teamId: text("team_id")
			.notNull()
			.references(() => team.id, { onDelete: "cascade" }),
		title: text("title").notNull().default("Untitled"),
		content: text("content").default(""),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
	},
	(table) => [
		index("page_teamId_idx").on(table.teamId),
		index("page_updatedAt_idx").on(table.updatedAt),
	],
);
