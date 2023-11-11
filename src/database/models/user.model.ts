// eslint-disable-next-line import/no-cycle
import { BaseModel } from './base.model';
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
export class UserModel extends BaseModel {
  @Column()
  tgId!: string;

  @Column({nullable: true})
  username!: string | null;

  @Column({nullable: true})
  firstName!: string | null;

  @Column({nullable: true})
  lastName!: string | null;

  @Column({nullable: true})
  language!: string | null;

  @Column()
  isAllowed!: boolean;
  
  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
