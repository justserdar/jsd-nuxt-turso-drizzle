import { drizzle } from "db0/integrations/drizzle/index";
export const orm = drizzle(useDatabase());
export const db = useDatabase();

export function migrateDatabase() {
  const db = useDatabase();
  db.sql`CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  db.sql`CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  db.sql`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    github_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL
  )`

  db.sql`CREATE TABLE IF NOT EXISTS session (
      id TEXT NOT NULL PRIMARY KEY,
      expires_at INTEGER NOT NULL,
      user_id TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id)
  )`

};


export interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}