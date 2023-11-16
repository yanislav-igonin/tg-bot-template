import { Base } from './base.model';
import { Chat } from './chat.model';
import { User } from './user.model';
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Table,
  Unique,
} from 'sequelize-typescript';

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
  @AllowNull(false)
  @Unique
  @Column
  tgId!: string;

  @ForeignKey(() => Chat)
  @AllowNull(false)
  @Column
  chatId!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @Column(DataType.TEXT)
  text!: string | null;
}
