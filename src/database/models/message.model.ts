import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { ChatModel } from './chat.model';
// eslint-disable-next-line import/no-cycle
import { UserModel } from './user.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageModel extends BaseModel {
  /**
   * Message text
   */
  @Column({ type: 'text' })
  text!: string;

  /**
   * Telegram message id
   */
  @Column()
  tgId!: string;

  /**
   * User id to which the message belongs
   */
  @Column()
  userId!: number;

  /**
   * User to which the message belongs
   */
  @ManyToOne(() => UserModel, (user) => user.messages)
  user!: UserModel;

  /**
   * Chat id to which the message belongs
   */
  @Column()
  chatId!: number;

  /**
   * Chat to which the message belongs
   */
  @ManyToOne(() => ChatModel, (chat) => chat.messages)
  chat!: ChatModel;
}
