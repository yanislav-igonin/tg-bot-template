import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'chats' })
export class ChatModel extends BaseModel {
  @Column()
  tgId!: string;

  @Column()
  name!: string;

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages!: MessageModel[];
}
