import { InferModel } from 'drizzle-orm'
import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'

export const tickets = sqliteTable('messages', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  description: text('description').notNull()
})

export type Ticket = InferModel<typeof tickets>;
export type InsertTicket = InferModel<typeof tickets, "insert">;