import { connection } from '..';
import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { Message } from './message.model';
import { Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User extends BaseModel {
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

  @OneToMany(() => Message, (message) => message.userId)
  messages?: Message[];
}

export const UserModel = connection.em.getRepository(User);
