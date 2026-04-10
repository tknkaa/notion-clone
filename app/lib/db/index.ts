import { drizzle } from "drizzle-orm/libsql";

export const db =
	process.env.NODE_ENV === "development"
		? drizzle({
				connection: {
					url: process.env.DATABASE_URL ?? "file:local.db",
				},
			})
		: drizzle({
				connection: {
					url: process.env.DATABASE_URL!,
					authToken: process.env.DATABASE_AUTH_TOKEN!,
				},
			});
