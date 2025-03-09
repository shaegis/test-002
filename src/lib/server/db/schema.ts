//import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { pgTable, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: varchar('id', { length: 255 }).primaryKey(),
    age: integer('age'),
    username: varchar('username', { length: 31 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    encryptionKey: varchar('encryption_key', { length: 255 }).notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
