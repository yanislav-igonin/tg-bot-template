import { Table, Column, ForeignKey, CreatedAt, PrimaryKey, UpdatedAt } from 'sequelize-typescript';
import { Chat } from './chat.model';
import { User } from './user.model';
import { Model } from 'sequelize';

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
export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
  @PrimaryKey
  id!: string;
  
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

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
