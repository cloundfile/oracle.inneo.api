import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741296108547 implements MigrationInterface {
    name = 'Default1741296108547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CHUNKS" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "UUID" varchar2(255) NOT NULL, "LANGUAGE" varchar2(255) NOT NULL, "TIMESTAMP" varchar2(255) NOT NULL, "TEXT" varchar2(255) NOT NULL, CONSTRAINT "PK_da71cfd8cae545253d3784a4e43" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "CHUNKS"`);
    }

}
