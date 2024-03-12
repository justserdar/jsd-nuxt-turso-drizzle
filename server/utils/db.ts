import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const database = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

export const orm = drizzle(database);