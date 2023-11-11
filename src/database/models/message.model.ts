import { BaseModel } from './base.model';
import { ChatModel } from './chat.model';
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
export class MessageModel extends BaseModel {
  @Column()
  text!: string;

  @ManyToOne(() => UserModel, (user) => user.messages)
  user!: UserModel;

  @ManyToOne(()=>ChatModel, (chat) => chat.messages)
  chat!: ChatModel;
}
