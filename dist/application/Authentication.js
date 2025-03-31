"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const UsuarioRep_1 = require("../repository/UsuarioRep");
const RolesRep_1 = require("../repository/RolesRep");
const jwtManager_1 = require("../utils/jwtManager");
const bcrypt = require('bcryptjs');
class Authentication {
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(401).send({ message: 'Username and Password required.' });
        const create = UsuarioRep_1.usuarioRep.create({
            username,
            password
        });
        const usuarios = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(create.username) });
        if (!usuarios)
            return res.status(403).json({ message: 'Unauthorized: Incorrect username or password.' });
        if (username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuarios?.password;
            const authenticated = await bcrypt.compare(use_password, dba_password);
            if (!authenticated)
                return res.status(403).json({ message: 'Unauthorized: Incorrect username or password.' });
            const token = (0, jwtManager_1.createToken)({ uuid: usuarios.uuid, username: usuarios.username });
            return res.status(200).json({ token: token });
        }
    }
    async create(req, res) {
        const { username, password, role_id } = req.body;
        if (!username || !password || !role_id)
            return res.status(400).json({ message: "Fields with * required." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuarioRep_1.usuarioRep.create({
            username,
            password: criptpass,
            role_id
        });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(create.username) });
        if (usuario)
            return res.status(400).json({ message: "Username unavailable." });
        await UsuarioRep_1.usuarioRep.save(create);
        return res.status(201).json(create);
    }
    async update(req, res) {
        const { uuid, username, password, role_id } = req.body;
        if (!username || !password || !role_id)
            return res.status(400).json({ message: "Fields with * required." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuarioRep_1.usuarioRep.create({
            uuid,
            username,
            password: criptpass,
            role_id
        });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid: Number(create.uuid) });
        if (!usuario)
            return res.status(400).json({ message: "UUID not found." });
        await UsuarioRep_1.usuarioRep.update(uuid, create);
        return res.status(201).json(create);
    }
    async delete(req, res) {
        const { uuid } = req.body;
        if (!uuid)
            return res.status(400).json({ message: "Mandatory UUID." });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid: Number(uuid) });
        if (!usuario)
            return res.status(400).json({ message: "UUID not found." });
        await UsuarioRep_1.usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Successfully deleted." });
    }
    async findall(req, res) {
        const usuario = await UsuarioRep_1.usuarioRep.find();
        if (!usuario)
            return res.status(400).json({ message: "No records found." });
        const response = await Promise.all(usuario.map(async (item) => {
            const role = await RolesRep_1.rolesRep.findOneBy({ uuid: item.role_id });
            return {
                uuid: item.uuid,
                username: item.username,
                role: role ? role.permission : null
            };
        }));
        return res.json(response);
    }
}
exports.Authentication = Authentication;
