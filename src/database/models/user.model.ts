import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel {
  @Column
  tgId!: string | null;

  @Column
  username!: string | null;

  @Column
  firstName!: string | null;

  @Column
  lastName!: string | null;

  @Column
  language!: string | null;

  @Column
  isAllowed: boolean = false;
}
