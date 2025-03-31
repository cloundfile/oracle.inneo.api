import { Request, Response } from 'express';
import { rolesRep } from '../repository/RolesRep';

export class Roles {
    async create(req: Request, res: Response) {
        const { uuid, permission } = req.body;
        if (!uuid || !permission) {
            return res.status(400).json({ message: "Fields ( uuid, permission ) are required." });
        } 

        const create = rolesRep.create({
                uuid,
                permission
            });
            await rolesRep.save(create);
    
        return res.status(201).json(create);
    }

     async delete(req: Request, res: Response) {
        const { uuid } = req.body; 
        if( !uuid ) return res.status(400).json({ message: "Field (uuid) is required."});   

        const roles = await rolesRep.findBy({uuid: Number(uuid)});
        if(!roles) return res.status(400).json({ message: "uuid não encontrado."});
  
        await rolesRep.delete(uuid);                   
        return res.status(201).json({ message: uuid + " Deleted successfully."});
    }

     async findAll(req: Request, res: Response) {
        const { uuid, language } = req.body; 
        const roles = await rolesRep.find();
        if(!roles) return res.status(200).json({ message: "No records found."});
        return res.json(roles);
    }
}

