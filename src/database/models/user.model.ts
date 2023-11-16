import { Base } from './base.model';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Table,
  Unique,
} from 'sequelize-typescript';

type UserAttributes = {
  createdAt: Date;
  firstName: string | null;
  id: number;
  isAllowed: boolean;
  languageCode: string | null;
  lastName: string | null;
  tgId: string;
  updatedAt: Date;
  username: string | null;
};
type UserCreationAttributes = Omit<
  UserAttributes,
  'createdAt' | 'id' | 'isAllowed' | 'updatedAt'
>;

@Table({ tableName: 'users' })
export class User extends Base<UserAttributes, UserCreationAttributes> {
  @AllowNull(false)
  @Unique
  @Column
  tgId!: string;

  @Column(DataType.STRING)
  username!: string | null;

  @Column(DataType.STRING)
  firstName!: string | null;

  @Column(DataType.STRING)
  lastName!: string | null;

  @Column(DataType.STRING(2))
  languageCode!: string | null;

  @AllowNull(false)
  @Default(false)
  @Column
  isAllowed!: boolean;
}
