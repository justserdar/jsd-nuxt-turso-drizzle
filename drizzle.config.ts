import { join } from 'pathe';
import type { Config } from "drizzle-kit";

export default {
  out: 'server/database/migrations',
  schema: 'server/database/schema.ts',
  driver: process.env.devDatabase ? "better-sqlite" : "turso",
  dbCredentials: {
    url: process.env.devDatabase ? join(process.cwd(), './.data/db.sqlite3') : process.env.TURSO_DB_URL as string,
    authToken: process.env.devDatabase ? "" : process.env.TURSO_DB_AUTH_TOKEN as string,
  },
} satisfies Config;