import { Request, Response } from 'express';
import { rotasRep } from '../repository/RotasRep';

export class Rotas {
    async create(req: Request, res: Response) {
        const { uuid, altitude, latitude, longitude } = req.body;
        if (!uuid || !altitude || !latitude || !longitude ) {
            return res.status(400).json({ message: "Fields ( altitude, latitude, longitude ) is required." });
        } 
        try{
            const create = rotasRep.create({
                uuid,
                altitude,
                latitude,
                longitude

            });
            await rotasRep.save(create);    
            return res.status(201).json(create);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching: ', error });
        }
    }
    
    async findBy(req: Request, res: Response) {
        const uuid = req.query.uuid;
        try{
            const rotas = await rotasRep.find({
                where: {uuid: String(uuid)},
                order: { id: 'ASC' }
            });
        
            if (rotas.length === 0) {
                return res.status(200).json({ message: "No records found." });
            }
        
            return res.json(rotas);
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const rotas = await rotasRep.find({ order: { id: 'ASC' }});
        
            if (rotas.length === 0) {
                return res.status(200).json({ message: "No records found." });
            }
        
            return res.json(rotas);
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }

    async delete(req: Request, res: Response) {
        const uuid = req.query.uuid;
        if (!uuid) return res.status(400).json({ message: "Field (uuid) is required." });
        try {
            const rotas = await rotasRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
        
            if (rotas.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }

            await rotasRep.remove(rotas);    
            return res.status(200).json({ message: "Records deleted successfully." });
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }   
}

