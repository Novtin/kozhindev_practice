import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721051361130 implements MigrationInterface {
  name = 'Migration1721051361130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")); COMMENT ON COLUMN "file"."id" IS 'Идентификатор файла'; COMMENT ON COLUMN "file"."name" IS 'Название'; COMMENT ON COLUMN "file"."mimeType" IS 'MIME тип'`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
