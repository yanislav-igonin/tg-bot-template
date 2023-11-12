import {
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

export class BaseModel extends Model {
  @PrimaryKey
  id!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
