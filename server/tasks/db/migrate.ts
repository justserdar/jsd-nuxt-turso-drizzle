import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { migrateDatabase } from "~/server/utils/db"

export default defineTask({
    async run() {
        if (process.env.devDatabase) migrateDatabase()
        return { result: 'ok' }
    }
})