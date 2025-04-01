import { usuarioRep } from '../repository/UsuarioRep';
import { createToken } from "../utils/jwtManager"
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class Authentication {
    async login(req: Request, res: Response) {        
        const { username, password } = req.body

        if( !username  || !password ) return res.status(401).send({ 
            message: 'Username and Password required.'
        });
       
        try {
            const usuario = await usuarioRep.findOne({
                where: { username: String(username) },
                relations: ['roles'],
            });

            if (!usuario) return res.status(403).json({
                message: 'Unauthorized: Incorrect username or password.'
            });

            const authenticated = await bcrypt.compare(password, usuario.password);
            if (!authenticated) {
                return res.status(403).json({ message: 'Unauthorized: Incorrect username or password.' });
            }

            const token = createToken({ uuid: usuario.uuid, username: usuario.username });
            const rolesPermissions = usuario.roles.map(role => role.permission);

            return res.status(200).json({
                usuario: usuario.username,
                roles: rolesPermissions, 
                token: token,
            });
        } catch (error) {
            return res.status(500).json({ message: "Error authenticate user", error });
        }
        finally {
            console.log('request completed successfully');
        }        
    }
}