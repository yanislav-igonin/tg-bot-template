import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel {
  @Property({ type: 'varchar', unique: true })
  tgId!: string;

  @Property({ nullable: true, type: 'varchar' })
  username!: string | null;

  @Property({ nullable: true, type: 'varchar' })
  firstName!: string | null;

  @Property({ nullable: true, type: 'varchar' })
  lastName!: string | null;

  @Property({ nullable: true, type: 'varchar(2)' })
  languageCode!: string | null;

  @Property({ default: false, type: 'boolean' })
  isAllowed: boolean = false;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages?: MessageModel[];
}
