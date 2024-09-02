import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724938821133 implements MigrationInterface {
    name = 'Migration1724938821133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
    }

}
