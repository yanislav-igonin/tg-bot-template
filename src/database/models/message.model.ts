import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { ChatModel } from './chat.model';
import { UserModel } from './user.model';

@Table({ tableName: 'users' })
export class MessageModel extends BaseModel {
  @Column
  tgId!: string;

  @ForeignKey(() => ChatModel)
  @Column
  chatId!: number;

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @Column
  text!: string | null;
}
