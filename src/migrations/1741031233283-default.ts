import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741031233283 implements MigrationInterface {
    name = 'Default1741031233283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CHUNKS" ADD "LANGUAGE" varchar2(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CHUNKS" DROP COLUMN "LANGUAGE"`);
    }

}
