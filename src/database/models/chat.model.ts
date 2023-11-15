import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

export enum ChatType {
  Channel = 'channel',
  Group = 'group',
  Private = 'private',
  Supergroup = 'supergroup',
}

@Entity({ tableName: 'chats' })
export class ChatModel extends BaseModel {
  @Property({ type: 'varchar', unique: true })
  tgId!: string;

  @Property({ nullable: false, type: 'varchar' })
  name!: string;

  @Enum(() => ChatType)
  type!: ChatType;

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages?: MessageModel[];
}
