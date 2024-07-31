import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722415898960 implements MigrationInterface {
  name = 'Migration1722415898960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_with_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_440b7bfeee7d7a0138bea1c9488" PRIMARY KEY ("postId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c6e7dcc83aed83d66c8c24a1ad" ON "post_with_tag" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3dc5ffee766def8ecf8a31f357" ON "post_with_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "post_with_tag" ADD CONSTRAINT "FK_c6e7dcc83aed83d66c8c24a1ad3" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_with_tag" ADD CONSTRAINT "FK_3dc5ffee766def8ecf8a31f357d" FOREIGN KEY ("tagId") REFERENCES "post_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_with_tag" DROP CONSTRAINT "FK_3dc5ffee766def8ecf8a31f357d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_with_tag" DROP CONSTRAINT "FK_c6e7dcc83aed83d66c8c24a1ad3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3dc5ffee766def8ecf8a31f357"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c6e7dcc83aed83d66c8c24a1ad"`,
    );
    await queryRunner.query(`DROP TABLE "post_with_tag"`);
  }
}
