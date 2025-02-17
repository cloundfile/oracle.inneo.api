"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const UsuarioRep_1 = require("../repository/UsuarioRep");
const jwtManager_1 = require("../utils/jwtManager");
const bcrypt = require('bcryptjs');
class Authentication {
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(401).send({ message: 'Username and Password obrigatório.' });
        const create = UsuarioRep_1.usuarioRep.create({
            username,
            password
        });
        const usuarios = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(create.username) });
        if (!usuarios)
            return res.status(403).json({ message: 'Não autorizado: username or password incorretos.' });
        if (username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuarios?.password;
            const authenticated = await bcrypt.compare(use_password, dba_password);
            if (!authenticated)
                return res.status(403).json({ message: 'Não autorizado: username or password incorretos.' });
            const token = (0, jwtManager_1.createToken)({ uuid: usuarios.uuid, username: usuarios.username });
            return res.status(200).json({ token: token });
        }
    }
    async create(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Campos com * obrigatório." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuarioRep_1.usuarioRep.create({
            username,
            password: criptpass
        });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(create.username) });
        if (usuario)
            return res.status(400).json({ message: "Username indisponível." });
        await UsuarioRep_1.usuarioRep.save(create);
        return res.status(201).json(create);
    }
    async update(req, res) {
        const { uuid, username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Campos com * obrigatório." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuarioRep_1.usuarioRep.create({
            uuid,
            username,
            password: criptpass
        });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid: Number(create.uuid) });
        if (!usuario)
            return res.status(400).json({ message: "UUID não encontrado." });
        await UsuarioRep_1.usuarioRep.update(uuid, create);
        return res.status(201).json(create);
    }
    async delete(req, res) {
        const { uuid } = req.body;
        if (!uuid)
            return res.status(400).json({ message: "UUID obrigatório." });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid: Number(uuid) });
        if (!usuario)
            return res.status(400).json({ message: "UUID não encontrado." });
        await UsuarioRep_1.usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Deletado com sucesso." });
    }
    async findall(req, res) {
        const usuario = await UsuarioRep_1.usuarioRep.find();
        if (!usuario)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const response = usuario.map(item => { return { uuid: item.uuid, username: item.username }; });
        return res.json(response);
    }
}
exports.Authentication = Authentication;
