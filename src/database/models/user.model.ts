// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  language!: string;

  @Column()
  isAllowed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
