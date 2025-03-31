import { usuarioRep } from '../repository/UsuarioRep';
import { rolesRep } from '../repository/RolesRep';
import { createToken } from "../utils/jwtManager"
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class Authentication {
    async login(req: Request, res: Response) {        
        const { username, password } = req.body
        if( !username  || !password ) return res.status(401).send({ message: 'Username and Password required.'});
        const create = usuarioRep.create({
            username,
            password
        })
        const usuarios = await usuarioRep.findOneBy({ username: String(create.username)});
        if (!usuarios) return res.status(403).json({message: 'Unauthorized: Incorrect username or password.'});
        if(username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuarios?.password;
            const authenticated = await  bcrypt.compare(use_password, dba_password);

            if (!authenticated) return res.status(403).json({ message: 'Unauthorized: Incorrect username or password.'});
            const role = await rolesRep.findOneBy({ uuid: usuarios.role_id });
            const token = createToken({ uuid: usuarios.uuid, username: usuarios.username })
	        return res.status(200).json({usuario: usuarios.username, role: role?.permission, token: token});
        }
    }

    async create(req: Request, res: Response) {
        const { username, password, role_id } = req.body
        if( !username || !password || !role_id ) return res.status(400).json({ message: "Fields with * required."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create = usuarioRep.create({
            username,
            password: criptpass,
            role_id
        })
        const usuario = await usuarioRep.findOneBy({username: String(create.username)});
        if(usuario) return res.status(400).json({ message: "Username unavailable."});
        await usuarioRep.save(create);
        return res.status(201).json(create);
    }

    async update(req: Request, res: Response) {
        const { uuid, username, password, role_id } = req.body;
        if(!username || !password || !role_id) return res.status(400).json({ message: "Fields with * required."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create =  usuarioRep.create({
            uuid,
            username,
            password: criptpass,
            role_id
        })
        const usuario = await usuarioRep.findOneBy({uuid: Number(create.uuid)});
        if(!usuario) return res.status(400).json({ message: "UUID not found."});
        await usuarioRep.update(uuid, create);
        return res.status(201).json(create);
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
		const usuario = await usuarioRep.find();
        if(!usuario) return res.status(400).json({ message: "No records found."});
        const response = await Promise.all(usuario.map(async (item) => {
            const role = await rolesRep.findOneBy({ uuid: item.role_id });
            return { 
                uuid: item.uuid, 
                username: item.username, 
                role: role ? role.permission : null
            };
        }));
		return res.json(response);
	}
}