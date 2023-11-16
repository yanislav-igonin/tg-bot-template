import { Base } from './base.model';
import { Column, Table } from 'sequelize-typescript';

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
  'createdAt' | 'id' | 'updatedAt'
>;

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
