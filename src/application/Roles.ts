import { Request, Response } from 'express';
import { rolesRep } from '../repository/RolesRep';
import { usuarioRep } from '../repository/UsuarioRep';

export class Roles {
    async create(req: Request, res: Response) {
        const { permission } = req.body;
        if (!permission) {
            return res.status(400).json({ message: "Fields ( permission ) is required." });
        } 

        const create = rolesRep.create({
                permission
            });
            await rolesRep.save(create);
    
        return res.status(201).json(create);
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.body; 
        if (!uuid) return res.status(400).json({ message: "Field (uuid) is required." });

        const role = await rolesRep.findOne({ where: { uuid: Number(uuid) } });
        if (!role) return res.status(400).json({ message: "Role not found." });

        const userWithRole = await usuarioRep.createQueryBuilder('usuario')
            .leftJoin('usuario.roles', 'role')
            .where('role.uuid = :uuid', { uuid: Number(uuid) })
            .getOne();
    
        if (userWithRole) {
            return res.status(400).json({ message: "You cannot delete a role that is in use." });
        }    

        await rolesRep.delete({ uuid: Number(uuid) });    
        return res.status(200).json({ message: `Role with uuid ${uuid} deleted successfully.` });
    }

    async findAll(req: Request, res: Response) {
        const { uuid } = req.body; 
        const roles = await rolesRep.find({
            order: {
              permission: 'ASC',
            },
          });
        if(!roles) return res.status(200).json({ message: "No records found."});
        return res.json(roles);
    }
}

