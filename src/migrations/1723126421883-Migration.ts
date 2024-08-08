import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723126421883 implements MigrationInterface {
  name = 'Migration1723126421883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_like" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_like" DROP COLUMN "createdAt"`);
  }
}
