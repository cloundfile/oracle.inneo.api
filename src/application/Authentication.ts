import { usuarioRep } from '../repository/UsuarioRep';
import { createToken } from "../utils/jwtManager"
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class Authentication {
    async login(req: Request, res: Response) {        
        const { username, password } = req.body
        if( !username  || !password ) return res.status(401).send({ message: 'Username and Password obrigatório.'});
        const create = usuarioRep.create({
            username,
            password
        })
        const usuarios = await usuarioRep.findOneBy({ username: String(create.username)});
        if (!usuarios) return res.status(403).json({message: 'Não autorizado: username or password incorretos.'});
        if(username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuarios?.password;
            const authenticated = await  bcrypt.compare(use_password, dba_password);

            if (!authenticated) return res.status(403).json({ message: 'Não autorizado: username or password incorretos.'});
            const token = createToken({ uuid: usuarios.uuid, username: usuarios.username })
	        return res.status(200).json({token: token});
        }
    }

    async create(req: Request, res: Response) {
        const { username, password } = req.body
        if( !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create = usuarioRep.create({
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({username: String(create.username)});
        if(usuario) return res.status(400).json({ message: "Username indisponível."});
        await usuarioRep.save(create);
        return res.status(201).json(create);
    }

    async update(req: Request, res: Response) {
        const { uuid, username, password } = req.body;
        if(!username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create =  usuarioRep.create({
            uuid,
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({uuid: Number(create.uuid)});
        if(!usuario) return res.status(400).json({ message: "UUID não encontrado."});
        await usuarioRep.update(uuid, create);
        return res.status(201).json(create);
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.body;
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."});   

        const usuario = await usuarioRep.findOneBy({uuid: Number(uuid)});        
        if(!usuario) return res.status(400).json({ message: "UUID não encontrado."});

        await usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Deletado com sucesso."});
    }

    async findall(req: Request, res: Response) {
		const usuario = await usuarioRep.find()
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = usuario.map(item => {  return { uuid: item.uuid, username: item.username }});
		return res.json(response);
	}
}