import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725348232054 implements MigrationInterface {
  name = 'Migration1725348232054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "creationTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "creatorId" integer, "lastModifiedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastModifiedById" integer, "deletedById" integer, "name" character varying NOT NULL DEFAULT '', "surname" character varying NOT NULL DEFAULT '', "userName" character varying, "emailAddress" character varying NOT NULL, "roleId" integer NOT NULL DEFAULT '2', "hash" character varying NOT NULL, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_0a15e52405edda3ea73124ab407" UNIQUE ("emailAddress"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_translations" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "isDefault" boolean NOT NULL, "name" character varying NOT NULL, "roleId" integer, CONSTRAINT "UQ_ba24e7266613fbb4dc3e1e693af" UNIQUE ("name"), CONSTRAINT "PK_d4b291a34e4535e472c6c42500a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "creationTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "creatorId" integer, "lastModifiedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastModifiedById" integer, "deletedById" integer, "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "UQ_25bc710ab2d1ab61bb7ac4cf5d9" UNIQUE ("displayName"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("roleId", "permissionId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b4599f8b8f548d35850afa2d12" ON "role_permissions" ("roleId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06792d0c62ce6b0203c03643cd" ON "role_permissions" ("permissionId") `
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_translations" ADD CONSTRAINT "FK_2cc794066a952f1f36ec4445cd3" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_translations" DROP CONSTRAINT "FK_2cc794066a952f1f36ec4445cd3"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06792d0c62ce6b0203c03643cd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b4599f8b8f548d35850afa2d12"`
    );
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "role_translations"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
