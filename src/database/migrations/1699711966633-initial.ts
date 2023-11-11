import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1699711966633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable({
      columns: [
        {
          isPrimary: true,
          name: 'id',
          type: 'int',
          isGenerated: true,
        },
        {
          name: 'content',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
        },
      ],
      name: 'messages',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
