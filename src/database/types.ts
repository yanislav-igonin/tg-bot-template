import {
  type ColumnType,
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from 'kysely';

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Base = {
  createdAt: Generated<Timestamp>;
  id: Generated<number>;
  updatedAt: Generated<Timestamp>;
};

export type ChatTable = Base & {
  name: string;
  tgId: string;
  type: 'channel' | 'group' | 'private' | 'supergroup';
};
export type Chat = Selectable<ChatTable>;
export type NewChat = Insertable<ChatTable>;
export type ChatUpdate = Updateable<ChatTable>;

export type MessageTable = Base & {
  chatId: number;
  text: string | null;
  /**
   * Not unique because in different chats can be messages with same id
   */
  tgId: string;
  userId: number;
};
export type Message = Selectable<MessageTable>;
export type NewMessage = Insertable<MessageTable>;
export type MessageUpdate = Updateable<MessageTable>;

export type UserTable = Base & {
  firstName: string | null;
  isAllowed: Generated<boolean>;
  language: string | null;
  lastName: string | null;
  tgId: string;
  username: string | null;
};
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Database = {
  chats: ChatTable;
  messages: MessageTable;
  users: UserTable;
};
