import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Base } from './base.model';

type ChatAttributes = {
  id: number;
  tgId: string;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};
type ChatCreationAttributes = Omit<ChatAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({ tableName: 'users' })
export class Chat extends Base<ChatAttributes, ChatCreationAttributes> {
  @Column({ allowNull: false })
  tgId!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  type!: string;
}
