import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel {
  @Column({ allowNull: false })
  tgId!: string;

  @Column
  username!: string | null;

  @Column
  firstName!: string | null;

  @Column
  lastName!: string | null;

  @Column({ type: 'varchar(2)' })
  languageCode!: string | null;

  @Column({ allowNull: false })
  isAllowed: boolean = false;
}
