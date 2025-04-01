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
            return res.status(401).send({
                message: 'Username and Password required.'
            });
        try {
            const usuario = await UsuarioRep_1.usuarioRep.findOne({
                where: { username: String(username) },
                relations: ['roles'],
            });
            if (!usuario)
                return res.status(403).json({
                    message: 'Unauthorized: Incorrect username or password.'
                });
            const authenticated = await bcrypt.compare(password, usuario.password);
            if (!authenticated) {
                return res.status(403).json({ message: 'Unauthorized: Incorrect username or password.' });
            }
            const token = (0, jwtManager_1.createToken)({ uuid: usuario.uuid, username: usuario.username });
            const rolesPermissions = usuario.roles.map(role => role.permission);
            return res.status(200).json({
                usuario: usuario.username,
                roles: rolesPermissions,
                token: token,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Error authenticate user", error });
        }
        finally {
            console.log('request completed successfully');
        }
    }
    async create(req, res) {
        const { username, password, roles } = req.body;
        if (!username || !password || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        const criptpass = bcrypt.hashSync(password, 10);
        try {
            const unavailable = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(username) });
            if (unavailable) {
                return res.status(400).json({ message: "Username unavailable." });
            }
            const roleEntities = await RolesRep_1.rolesRep.findByIds(roles);
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }
            const usuario = UsuarioRep_1.usuarioRep.create({
                username,
                password: criptpass,
                roles: roleEntities
            });
            await UsuarioRep_1.usuarioRep.save(usuario);
            return res.status(201).json({ username: usuario.username, roles: usuario.roles.map(role => role.permission) });
        }
        catch (error) {
            return res.status(500).json({ message: "Error creating user", error });
        }
        finally {
            console.log('request completed successfully');
        }
    }
    async update(req, res) {
        const { uuid, username, password, roles } = req.body;
        if (!username || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        let criptpass;
        if (password) {
            criptpass = bcrypt.hashSync(password, 10);
        }
        try {
            const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid });
            if (!usuario) {
                return res.status(400).json({ message: "User not found." });
            }
            const roleEntities = await RolesRep_1.rolesRep.findByIds(roles);
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }
            usuario.username = username;
            if (criptpass) {
                usuario.password = criptpass;
            }
            usuario.roles = roleEntities;
            await UsuarioRep_1.usuarioRep.save(usuario);
            return res.status(200).json({ uuid: usuario.uuid, username: usuario.username, roles: usuario.roles.map(role => role.permission) });
        }
        catch (error) {
            return res.status(500).json({ message: "Error updating user", error });
        }
        finally {
            console.log('request completed successfully');
        }
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
        const usuarios = await UsuarioRep_1.usuarioRep.find({ relations: ['roles'] });
        if (!usuarios || usuarios.length === 0) {
            return res.status(400).json({ message: "No records found." });
        }
        const response = usuarios.map((usuario) => {
            const rolesPermissions = usuario.roles.map(role => role.permission);
            return {
                uuid: usuario.uuid,
                username: usuario.username,
                roles: rolesPermissions.length > 0 ? rolesPermissions : null
            };
        });
        return res.json(response);
    }
}
exports.Authentication = Authentication;
