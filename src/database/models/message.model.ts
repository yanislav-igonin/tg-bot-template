import { UserModel } from './user.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MessageModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => UserModel, (user) => user.messages)
  user!: UserModel;

  @CreateDateColumn()
  createdAt!: Date;
}
