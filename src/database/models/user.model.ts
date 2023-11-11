import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel {
  @Property()
  tgId!: string;

  @Property({ nullable: true })
  username?: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property()
  languageCode: string = 'en';

  @Property()
  isAllowed: boolean = false;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
