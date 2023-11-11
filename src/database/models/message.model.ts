import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { ChatModel } from './chat.model';
// eslint-disable-next-line import/no-cycle
import { UserModel } from './user.model';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';

@Entity({ tableName: 'messages' })
export class MessageModel extends BaseModel {
  @Property()
  tgId!: string;

  @Property()
  text!: string;

  @ManyToOne()
  user!: UserModel;

  @ManyToOne()
  chat!: ChatModel;
}
