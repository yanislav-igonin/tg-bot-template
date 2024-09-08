import { BaseModel } from './base.model';
// eslint-disable-next-line import/no-cycle
import { MessageModel } from './message.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserModel extends BaseModel {
  /**
   * Telegram user id
   */
  @Column()
  tgId!: string;

  /**
   * Telegram username
   */
  @Column({ nullable: true, type: 'varchar' })
  username?: string;

  /**
   * Telegram first name
   */
  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  /**
   * Telegram last name
   */
  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  /**
   * Telegram language code
   */
  @Column({ nullable: true, type: 'varchar' })
  language?: string;

  /**
   * Is user allowed to use bot
   */
  @Column({ default: false })
  isAllowed?: boolean = false;

  /**
   * Messages sent by the user
   */
  @OneToMany(() => MessageModel, (message) => message.user)
  messages!: MessageModel[];
}
