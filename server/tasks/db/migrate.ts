import { migrateDatabase } from "~/server/utils/db"

export default defineTask({
    async run() {
        if (process.env.devDatabase) migrateDatabase()
        return { result: 'ok' }
    }
})