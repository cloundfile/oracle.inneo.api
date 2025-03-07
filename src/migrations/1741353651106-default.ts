import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741353651106 implements MigrationInterface {
    name = 'Default1741353651106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CHUNKS" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "UUID" varchar2(255) NOT NULL, "LANGUAGE" varchar2(255) NOT NULL, "TIMESTAMP" number NOT NULL, "TEXT" varchar2(255) NOT NULL, CONSTRAINT "UNIQUE_UUID_AND_TEXT" UNIQUE ("UUID", "TEXT"), CONSTRAINT "PK_da71cfd8cae545253d3784a4e43" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CHUNKS"`);
    }

}
