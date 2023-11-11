import { UserModel } from './user.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageModel } from './message.model';
import { BaseModel } from './base.model';

@Entity()
export class ChatModel extends BaseModel {
  @Column()
  tgId!: string;

  @Column()
  name!: string;

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages!: MessageModel[];
}
