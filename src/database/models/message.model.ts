import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { Base } from './base.model';
import { Chat } from './chat.model';
import { User } from './user.model';

type MessageAttributes = {
  id: number;
  tgId: string;
  chatId: number;
  userId: number;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
};
type MessageCreationAttributes = Omit<
  MessageAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({ tableName: 'users' })
export class Message extends Base<MessageAttributes, MessageCreationAttributes> {
  @Column
  tgId!: string;

  @ForeignKey(() => Chat)
  @Column
  chatId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @Column
  text!: string | null;
}
