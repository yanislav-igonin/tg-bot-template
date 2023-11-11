import { connection } from '..';
import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { Chat } from './chat.model';
// eslint-disable-next-line import/no-cycle
import { User } from './user.model';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';

@Entity({ tableName: 'messages' })
export class Message extends BaseModel {
  @Property()
  tgId!: string;

  @Property()
  text!: string;

  @ManyToOne()
  user!: User;

  @ManyToOne()
  chat!: Chat;
}

export const MessageModel = connection.em.getRepository(Message);
