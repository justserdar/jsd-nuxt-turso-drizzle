import { InferModel } from 'drizzle-orm'
import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'

export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  description: text('description').notNull()
})

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  description: text('description').notNull()
})

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  github_id: text('github_id').notNull(),
  username: text('username').notNull()
})

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  github_id: text('github_id').notNull(),
  username: text('username').notNull(),
  expires_at: integer('expires_at', { mode: 'timestamp'}).notNull(),
  user_id: text("user_id")
    .references(() => user.id)
    .notNull(),
})


export interface DatabaseUser {
id: string;
username: string;
github_id: number;
}

// InferModel from drizzle-orm deprecated, replace asap for Production!
export type Ticket = InferModel<typeof tickets>;
export type InsertTicket = InferModel<typeof tickets, "insert">;