import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722326490027 implements MigrationInterface {
  name = 'Migration1722326490027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_like" ("userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_754a5e1d4e513c739e9c39a8d79" PRIMARY KEY ("userId", "postId")); COMMENT ON COLUMN "post_like"."userId" IS 'ID пользователя'; COMMENT ON COLUMN "post_like"."postId" IS 'ID поста'`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" ADD CONSTRAINT "FK_909fc474ef645901d01f0cc0662" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" ADD CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_like" DROP CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" DROP CONSTRAINT "FK_909fc474ef645901d01f0cc0662"`,
    );
    await queryRunner.query(`DROP TABLE "post_like"`);
  }
}
