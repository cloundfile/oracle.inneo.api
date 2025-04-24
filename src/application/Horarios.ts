import { Request, Response } from 'express';
import { horariosRep } from '../repository/HorariosRep';
import { v4 as uuidv4 } from 'uuid';

export class Horarios {
    async create(req: Request, res: Response) {
        const { uuid, saida, chegada } = req.body;
        if (!uuid || !saida || !chegada) {
            return res.status(400).json({ message: "Fields ( uuid, saida, chegada ) is required." });
        } 

        const create = horariosRep.create({
                uuid,
                saida,
                chegada

            });
            await horariosRep.save(create);
    
        return res.status(201).json(create);
    }

    async findBy(req: Request, res: Response) {
        const uuid = req.query.uuid;
        try{
            const response = await horariosRep.find({ 
                where: {uuid: String(uuid)},
                order: { id: 'ASC' }
            });
            if(!response) return res.status(200).json({ message: "No records found."});
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }

    async findAll(req: Request, res: Response) {
        try{
            const response = await horariosRep.find({ order: { id: 'ASC' }});
            if(!response) return res.status(200).json({ message: "No records found."});
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }

     async delete(req: Request, res: Response) {
        const uuid = req.query.uuid;
        if (!uuid) return res.status(400).json({ message: "Field (uuid) is required." });
        try {
            const response = await horariosRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
        
            if (response.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }

            await horariosRep.remove(response);    
            return res.status(200).json({ message: "Records deleted successfully." });
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    } 
}

