import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel {
  @Property()
  tgId!: string;

  @Property({ nullable: true })
  username!: string | null;

  @Property({ nullable: true })
  firstName?: string | null;

  @Property({ nullable: true })
  lastName?: string | null;

  @Property()
  languageCode?: string | null;

  @Property({ default: false })
  isAllowed: boolean = false;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages?: MessageModel[];
}
