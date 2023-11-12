import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserModel extends BaseModel {
  @Column()
  tgId!: string;

  @Column({ nullable: true, type: 'varchar' })
  username?: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ nullable: true, type: 'varchar' })
  language?: string;

  @Column()
  isAllowed!: boolean;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
