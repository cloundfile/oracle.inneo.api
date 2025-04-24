import { Request, Response } from 'express';
import { pontosRep } from '../repository/PontosRep';
import { v4 as uuidv4 } from 'uuid';

export class Pontos {
    async create(req: Request, res: Response) {
        const { uuid, description, address, latitude, longitude } = req.body;
        if (!uuid || !description || !address || !latitude || !longitude ) {
            return res.status(400).json({ message: "Fields ( uuid, description, address, latitude, longitude ) is required." });
        } 
        try{
            const create = pontosRep.create({
                    uuid,
                    description,
                    address,
                    latitude,
                    longitude

                });
                await pontosRep.save(create);
        
            return res.status(201).json(create);
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }

    async findBy(req: Request, res: Response) {
        const uuid = req.query.uuid;
        try{
            const response = await pontosRep.find({ 
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
            const response = await pontosRep.find({ order: { id: 'ASC' }});
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
            const response = await pontosRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
        
            if (response.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }

            await pontosRep.remove(response);    
            return res.status(200).json({ message: "Records deleted successfully." });
        } catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    } 
}

