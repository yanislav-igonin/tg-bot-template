import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export class BaseModel extends BaseEntity {
  /**
   * Unique identifier
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Date and time when the record was created
   */
  @CreateDateColumn()
  createdAt!: Date;

  /**
   * Date and time when the record was last updated
   */
  @UpdateDateColumn()
  updatedAt!: Date;
}
