"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1739637643169 = void 0;
class Default1739637643169 {
    constructor() {
        this.name = 'Default1739637643169';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "USUARIOS" ("UUID" number GENERATED BY DEFAULT AS IDENTITY, "USERNAME" varchar2(255) NOT NULL, "PASSWORD" varchar2(255) NOT NULL, CONSTRAINT "PK_0d863bf429e491a2f11ba3d51f6" PRIMARY KEY ("UUID"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "USUARIOS"`);
    }
}
exports.Default1739637643169 = Default1739637643169;
