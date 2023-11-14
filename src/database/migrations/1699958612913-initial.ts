import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class Initial1699958612913 implements MigrationInterface {
  name = 'Initial1699958612913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tgId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tgId" character varying NOT NULL, "username" character varying, "firstName" character varying, "lastName" character varying, "language" character varying, "isAllowed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text NOT NULL, "tgId" character varying NOT NULL, "userIdId" integer, "chatIdId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_ba45a3b6a1a8151b3e00eb4bba0" FOREIGN KEY ("chatIdId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Add bot user
    await queryRunner.query(
      `INSERT INTO "users" ("tgId", "username", "firstName", "lastName") VALUES ('bot', 'bot', 'bot', 'bot')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_ba45a3b6a1a8151b3e00eb4bba0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_64583a890d0fb93de80bfe6cceb"`,
    );
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "chats"`);
  }
}
