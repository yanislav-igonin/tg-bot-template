import { connection } from '..';
import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { Message } from './message.model';
// eslint-disable-next-line import/no-cycle
import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

export enum ChatType {
  Channel = 'channel',
  Group = 'group',
  Private = 'private',
  Supergroup = 'supergroup',
}

@Entity({ tableName: 'chats' })
export class Chat extends BaseModel {
  @Property()
  tgId!: string;

  @Property()
  name!: string;

  @Enum(() => ChatType)
  type!: ChatType;

  @OneToMany(() => Message, (message) => message.chat)
  messages?: Message[];
}

export const ChatModel = connection.em.getRepository(Chat);
