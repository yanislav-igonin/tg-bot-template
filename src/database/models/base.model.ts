import {
  BaseEntity,
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseModel extends BaseEntity<BaseModel, 'id'> {
  [OptionalProps]!: 'createdAt' | 'updatedAt';

  @PrimaryKey({ autoincrement: true, type: 'number' })
  id!: number;

  @Property({ defaultRaw: 'NOW()', nullable: false, type: 'timestamp' })
  createdAt!: Date;

  @Property({
    defaultRaw: 'NOW()',
    nullable: false,
    onUpdate: () => new Date(),
    type: 'timestamp',
  })
  updatedAt!: Date;
}
