import { Base } from './base.model';
import { Column, Table } from 'sequelize-typescript';

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
  @Column({ allowNull: false })
  tgId!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  type!: ChatType;
}
