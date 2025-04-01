import { usuarioRep } from '../repository/UsuarioRep';
import { rolesRep } from '../repository/RolesRep';
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

    async create(req: Request, res: Response) {
        const { username, password, roles } = req.body;
        if (!username || !password || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
    
        const criptpass = bcrypt.hashSync(password, 10);
    
        try {
            const unavailable = await usuarioRep.findOneBy({ username: String(username) });
            if (unavailable) {
                return res.status(400).json({ message: "Username unavailable." });
            }
    
            const roleEntities = await rolesRep.findByIds(roles);
            
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }
    
            const usuario = usuarioRep.create({
                username,
                password: criptpass,
                roles: roleEntities
            });
    
            await usuarioRep.save(usuario);
            return res.status(201).json({username: usuario.username, roles: usuario.roles.map(role => role.permission) });
        } catch (error) {
            return res.status(500).json({ message: "Error creating user", error });
        } finally {
            console.log('request completed successfully');
        }
    }

    async update(req: Request, res: Response) {
        const { uuid, username, password, roles } = req.body;
    
        if (!username || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
    
        let criptpass: string | undefined;
        if (password) {
            criptpass = bcrypt.hashSync(password, 10);
        }
    
        try {
            const usuario = await usuarioRep.findOneBy({ uuid });
            if (!usuario) {
                return res.status(400).json({ message: "User not found." });
            }    

            const roleEntities = await rolesRep.findByIds(roles);
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }    

            usuario.username = username;
            if (criptpass) {
                usuario.password = criptpass;
            }
            usuario.roles = roleEntities; 
            await usuarioRep.save(usuario);  

            return res.status(200).json({uuid: usuario.uuid, username: usuario.username, roles: usuario.roles.map(role => role.permission) });  
        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error });
        } finally {
            console.log('request completed successfully');
        }
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.body;
        if( !uuid ) return res.status(400).json({ message: "Mandatory UUID."});   

        const usuario = await usuarioRep.findOneBy({uuid: Number(uuid)});        
        if(!usuario) return res.status(400).json({ message: "UUID not found."});

        await usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Successfully deleted."});
    }

    async findall(req: Request, res: Response) {
        const usuarios = await usuarioRep.find({ relations: ['roles'] });
        
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