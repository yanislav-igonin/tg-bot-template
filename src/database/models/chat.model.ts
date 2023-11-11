import { BaseModel } from './base.model';
import { MessageModel } from './message.model';
// eslint-disable-next-line import/no-cycle
import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

enum ChatType {
  Channel = 'channel',
  Group = 'group',
  Private = 'private',
  Supergroup = 'supergroup',
}

@Entity({ tableName: 'chats' })
export class ChatModel extends BaseModel {
  @Property()
  tgId!: string;

  @Property()
  name!: string;

  @Enum(() => ChatType)
  type!: ChatType;

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages!: MessageModel[];
}
