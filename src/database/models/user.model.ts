// eslint-disable-next-line import/no-cycle
import { BaseModel } from './base.model';
import { MessageModel } from './message.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserModel extends BaseModel {
  @Column()
  tgId!: string;

  @Column({ nullable: true, type: 'varchar' })
  username!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  firstName!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastName!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  language!: string | null;

  @Column()
  isAllowed!: boolean;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
