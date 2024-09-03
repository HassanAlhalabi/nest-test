import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725348732613 implements MigrationInterface {
  name = 'Migration1725348732613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phoneNumber" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
  }
}
