import { Request, Response } from 'express';

export class Server {   
    async status(req: Request, res: Response) {
        const response = {
            version: "1.0.0",
            title: "API SERVICES INNEO.ORG",
            description: "Serviços inneo.org",
        }
        return res.status(200).json(response);
    }
}