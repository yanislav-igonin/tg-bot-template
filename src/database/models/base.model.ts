import {
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

export class Base<T1 extends {}, T2 extends {}> extends Model<T1, T2> {
  @PrimaryKey
  id!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
