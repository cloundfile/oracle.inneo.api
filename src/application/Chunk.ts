import { Request, Response } from 'express';
import { chunkRep } from '../repository/ChunkRep';

export class Chunk {
    async create(req: Request, res: Response) {
        const { videoId, language, chunks } = req.body;
        if (!videoId || !language || !chunks) {
            return res.status(400).json({ message: "Campos com * obrigatório." });
        }    

        for (const item of chunks) {
            const timestampJson = JSON.stringify(item.timestamp);
            const create = chunkRep.create({
                videoId,
                language,
                timestamp: timestampJson,
                text: item.text
            });
            await chunkRep.save(create);
        }
    
        return res.status(201).json(chunks);
    }

     async delete(req: Request, res: Response) {
        const { videoId, language } = req.body; 
        if( !videoId || !language ) return res.status(400).json({ message: "videoId and language são obrigatórios."});   

        const chunks = await chunkRep.findBy({videoId: String(videoId), language: String(language)});
        if(!chunks) return res.status(400).json({ message: "videoId não encontrado."});

        chunks.map(async item => {
            await chunkRep.delete(item.uuid);
        });        
        return res.status(201).json({ message: videoId + " Deletado com sucesso."});
    }

     async findall(req: Request, res: Response) {
        const { videoId, language } = req.body; 
        const chunks = await chunkRep.findBy({videoId: String(videoId), language: String(language)});
        if(!chunks) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = chunks.map(item => {  return { uuid: item.uuid, videoid: item.videoId, timestamp: item.timestamp, text: item.text} });
        return res.json(response);
    }
}

