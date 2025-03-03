import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741026886745 implements MigrationInterface {
    name = 'Default1741026886745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "VIDEOS" ("UUID" number GENERATED BY DEFAULT AS IDENTITY, "VIDEOID" varchar2(255) NOT NULL, "URI" varchar2(255) NOT NULL, CONSTRAINT "PK_0cb2126675b2781186af888578e" PRIMARY KEY ("UUID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "VIDEOS"`);
    }

}
