import { Base } from './base.model';
import { Chat } from './chat.model';
import { User } from './user.model';
import { Column, ForeignKey, Table } from 'sequelize-typescript';

type MessageAttributes = {
  chatId: number;
  createdAt: Date;
  id: number;
  text: string | null;
  tgId: string;
  updatedAt: Date;
  userId: number;
};
type MessageCreationAttributes = Omit<
  MessageAttributes,
  'createdAt' | 'id' | 'updatedAt'
>;

@Table({ tableName: 'users' })
export class Message extends Base<
  MessageAttributes,
  MessageCreationAttributes
> {
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
