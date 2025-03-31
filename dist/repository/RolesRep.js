"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRep = void 0;
const data_source_1 = require("../data-source");
const Roles_1 = require("../entities/Roles");
exports.rolesRep = data_source_1.AppDataSource.getRepository(Roles_1.Roles);
