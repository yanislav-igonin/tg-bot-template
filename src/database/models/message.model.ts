import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { ChatModel } from './chat.model';
// eslint-disable-next-line import/no-cycle
import { UserModel } from './user.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageModel extends BaseModel {
  @Column()
  text!: string;

  @ManyToOne(() => UserModel, (user) => user.messages)
  user!: UserModel;

  @ManyToOne(() => ChatModel, (chat) => chat.messages)
  chat!: ChatModel;
}
