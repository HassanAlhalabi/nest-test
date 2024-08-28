import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724769270590 implements MigrationInterface {
    name = 'Migration1724769270590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "creationTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "creatorId" integer, "lastModifiedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastModifiedById" integer, "deletedById" integer, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "roleId" integer NOT NULL DEFAULT '2', "hash" character varying NOT NULL, "testMigrate" character varying NOT NULL DEFAULT 'yaaaay', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "creationTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "creatorId" integer, "lastModifiedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastModifiedById" integer, "deletedById" integer, "permissions" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
