import { Base } from './base.model';
import {
  AllowNull,
  Column,
  DataType,
  Table,
  Unique,
} from 'sequelize-typescript';

export enum ChatType {
  Channel = 'channel',
  Group = 'group',
  Private = 'private',
  Supergroup = 'supergroup',
}
type ChatAttributes = {
  createdAt: Date;
  id: number;
  name: string;
  tgId: string;
  type: ChatType;
  updatedAt: Date;
};
type ChatCreationAttributes = Omit<
  ChatAttributes,
  'createdAt' | 'id' | 'updatedAt'
>;

@Table({ tableName: 'users' })
export class Chat extends Base<ChatAttributes, ChatCreationAttributes> {
  @AllowNull(false)
  @Unique
  @Column
  tgId!: string;

  @Column
  name!: string;

  @Column(DataType.ENUM(...Object.values(ChatType)))
  type!: ChatType;
}
