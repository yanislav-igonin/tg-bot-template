import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseModel extends BaseEntity<BaseModel, 'id'> {
  @PrimaryKey()
  id!: number;

  @Property({ defaultRaw: 'NOW()' })
  createdAt?: Date = new Date();

  @Property({ defaultRaw: 'NOW()', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
