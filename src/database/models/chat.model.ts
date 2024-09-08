import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'chats' })
export class ChatModel extends BaseModel {
  /**
   * Telegram chat id
   */
  @Column()
  tgId!: string;

  /**
   * Telegram Chat name
   */
  @Column()
  name!: string;

  /**
   * Messages sent in the chat
   */
  @OneToMany(() => MessageModel, (message) => message.chat)
  messages!: MessageModel[];
}
