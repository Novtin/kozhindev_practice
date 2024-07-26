import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721979105730 implements MigrationInterface {
  name = 'Migration1721979105730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_subscription" ("userId" integer NOT NULL, "followerId" integer NOT NULL, CONSTRAINT "PK_9ca93dff1ac3c63bb056bd6fe0e" PRIMARY KEY ("userId", "followerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_403d98d1638533c09f9b185929" ON "user_subscription" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13e07a2aae74a5d365f86083b6" ON "user_subscription" ("followerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_403d98d1638533c09f9b185929b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_13e07a2aae74a5d365f86083b67" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_13e07a2aae74a5d365f86083b67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_403d98d1638533c09f9b185929b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13e07a2aae74a5d365f86083b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_403d98d1638533c09f9b185929"`,
    );
    await queryRunner.query(`DROP TABLE "user_subscription"`);
  }
}
