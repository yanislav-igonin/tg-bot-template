/* eslint-disable canonical/sort-keys */
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const baseTable = {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at').notNull().default(new Date()),
};

export const users = pgTable('users', {
  ...baseTable,
  firstName: varchar('first_name', { length: 256 }),
  isAllowed: boolean('is_allowed').notNull().default(false),
  languageCode: varchar('language_code', { length: 2 }),
  lastName: varchar('last_name', { length: 256 }),
  name: varchar('name', { length: 256 }),
  tgId: varchar('tg_id', { length: 256 }).notNull().unique(),
});

export const chatTypeEnum = pgEnum('type', [
  'private',
  'group',
  'supergroup',
  'channel',
]);
export const chats = pgTable('chats', {
  ...baseTable,
  name: varchar('name', { length: 256 }).notNull(),
  tgId: varchar('tg_id', { length: 256 }).notNull().unique(),
  type: chatTypeEnum('type').notNull(),
});

export const messages = pgTable('messages', {
  ...baseTable,
  chatId: integer('chat_id')
    .references(() => chats.id)
    .notNull(),
  text: text('text'),
  tgId: varchar('tg_id', { length: 256 }).notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
});
