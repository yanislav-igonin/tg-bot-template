import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  boolean,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  tgId: varchar('tg_id', { length: 256 }).notNull().unique(),
  languageCode: varchar('language_code', { length: 2 }),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  isAllowed: boolean('is_allowed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at').notNull().default(new Date()),
});

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  tgId: varchar('tg_id', { length: 256 }).notNull().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  type: varchar('type', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at').notNull().default(new Date()),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: integer('chat_id')
    .references(() => chats.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  tgId: varchar('tg_id', { length: 256 }).notNull(),
  text: text('text'),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at').notNull().default(new Date()),
});
