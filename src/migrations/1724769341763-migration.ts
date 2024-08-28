import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724769341763 implements MigrationInterface {
    name = 'Migration1724769341763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "testMigrate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "testMigrate" character varying NOT NULL DEFAULT 'yaaaay'`);
    }

}
