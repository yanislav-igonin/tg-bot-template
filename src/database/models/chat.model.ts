import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'users' })
export class ChatModel extends BaseModel {
  @Column({ allowNull: false })
  tgId!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  type!: string;
}
