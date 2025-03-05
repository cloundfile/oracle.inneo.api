import { Request, Response } from 'express';
import { videoRep } from '../repository/VideoRep';
import { chunkRep } from '../repository/ChunkRep';

export class Video {
    async create(req: Request, res: Response) {
        const { videoId } = req.body
        if( !videoId ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const create = videoRep.create({
            videoId,
            uri: `https://www.youtube.com/watch?v=${videoId}`
        })

        const registered = await videoRep.findOneBy({videoId: String(create.videoId)});
        if(registered) return res.status(400).json({ message: "Vídeo already registered."});
        await videoRep.save(create);
        return res.status(201).json(create);
    }

    async findBy(req: Request, res: Response) {
        const { videoId, language } = req.body; 
        const video = await videoRep.findOneBy({videoId: String(videoId)});
        if(!video) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const chunks = await chunkRep.findBy({videoId: video.videoId, language: String(language)});
        
        const response = {
            video,
            chunks: chunks.map((item) => {
                return { timestamp: item.timestamp, text: item.text }
            })
        }
        return res.json(response);
    }

    async findall(req: Request, res: Response) {
        const video = await videoRep.find()
        if(!video) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = video.map(item => {  return { uuid: item.uuid, videoid: item.videoId, uri: item.uri } });
        return res.json(response);
    }
}