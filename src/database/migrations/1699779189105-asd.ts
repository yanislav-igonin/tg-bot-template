import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Asd1699779189105 implements MigrationInterface {
  name = 'Asd1699779189105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "messages_userId_fkey"`,
    );
    await queryRunner.query(`DROP INDEX "public"."chats_tgId_key"`);
    await queryRunner.query(`DROP INDEX "public"."users_tgId_key"`);
    await queryRunner.query(`DROP INDEX "public"."users_username_key"`);
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "tgId"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "createdAt" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "tgId"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "tgId" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "chats" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tgId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "tgId" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "firstName" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastName" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "language"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "language" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isAllowed" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "createdAt" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "messages" ADD "text" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "chatId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "chatId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "text"`);
    await queryRunner.query(`ALTER TABLE "messages" ADD "text" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isAllowed" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "language"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "language" text`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "lastName" text`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "firstName" text`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "username" text`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tgId"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "tgId" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "chats" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "tgId"`);
    await queryRunner.query(`ALTER TABLE "chats" ADD "tgId" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ALTER COLUMN "createdAt" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "messages" ADD "tgId" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "chats" ADD "type" text NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_username_key" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_tgId_key" ON "users" ("tgId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "chats_tgId_key" ON "chats" ("tgId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }
}
