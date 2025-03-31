"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const RolesRep_1 = require("../repository/RolesRep");
class Roles {
    async create(req, res) {
        const { uuid, permission } = req.body;
        if (!uuid || !permission) {
            return res.status(400).json({ message: "Fields ( uuid, permission ) are required." });
        }
        const create = RolesRep_1.rolesRep.create({
            uuid,
            permission
        });
        await RolesRep_1.rolesRep.save(create);
        return res.status(201).json(create);
    }
    async delete(req, res) {
        const { uuid } = req.body;
        if (!uuid)
            return res.status(400).json({ message: "Field (uuid) is required." });
        const roles = await RolesRep_1.rolesRep.findBy({ uuid: Number(uuid) });
        if (!roles)
            return res.status(400).json({ message: "uuid não encontrado." });
        await RolesRep_1.rolesRep.delete(uuid);
        return res.status(201).json({ message: uuid + " Deleted successfully." });
    }
    async findAll(req, res) {
        const { uuid } = req.body;
        const roles = await RolesRep_1.rolesRep.find();
        if (!roles)
            return res.status(200).json({ message: "No records found." });
        return res.json(roles);
    }
}
exports.Roles = Roles;
