"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1741292306708 = void 0;
class Default1741292306708 {
    constructor() {
        this.name = 'Default1741292306708';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "VIDEOS" ("ID" number GENERATED BY DEFAULT AS IDENTITY, "UUID" varchar2(255) NOT NULL, "TITLE" varchar2(255) NOT NULL, "DESCRIPTION" varchar2(255) NOT NULL, CONSTRAINT "PK_e76d93352c6ffecf8cf0d3607d2" PRIMARY KEY ("ID"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "VIDEOS"`);
    }
}
exports.Default1741292306708 = Default1741292306708;
