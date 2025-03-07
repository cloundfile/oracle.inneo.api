import { Request, Response } from 'express';
import { videoRep } from '../repository/VideoRep';
import { chunkRep } from '../repository/ChunkRep';

export class Video {
    async create(req: Request, res: Response) {
        const { uuid, title, description } = req.body
        if( !uuid || !title ||!description ) return res.status(400).json({ message: "Fields ( uuid, title, description ) are required."});

        const create = videoRep.create({
            uuid,
            title,
            description
        })

        const registered = await videoRep.findOneBy({uuid: String(create.uuid)});
        if(registered) return res.status(400).json({ message: "Vídeo already registered."});
        await videoRep.save(create);
        return res.status(201).json(create);
    }

    async findBy(req: Request, res: Response) {
        const { uuid, language } = req.body; 
        const video = await videoRep.findOneBy({uuid: String(uuid)});
        if(!video) return res.status(200).json({ message: "No records found."});
        const chunks = await chunkRep.find({
            where: {
              uuid: video.uuid,
              language: language,
            },
            order: {
              timestamp: 'ASC',
            },
          });
        
        const response = {
            video,
            chunks: chunks.map((item) => {
                return { 
                    language: item.language, 
                    timestamp: item.timestamp, 
                    text: item.text 
                }
            })
        }
        return res.json(response);
    }

    async findall(req: Request, res: Response) {
        const video = await videoRep.find()
        if(!video) return res.status(200).json({ message: "NNo records found."});
        const response = video.map(item => {  
            return { uuid: item.uuid, title: item.title, description: item.description }
        });
        return res.json(response);
    }
}