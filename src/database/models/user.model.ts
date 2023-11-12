import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Base } from './base.model';

type UserAttributes = {
  id: number;
  tgId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  languageCode: string | null;
  isAllowed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({ tableName: 'users' })
export class User extends Base<UserAttributes, UserCreationAttributes> {
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
