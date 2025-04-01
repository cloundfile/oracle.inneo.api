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
}
exports.Authentication = Authentication;
