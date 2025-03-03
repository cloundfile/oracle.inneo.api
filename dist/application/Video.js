"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const VideoRep_1 = require("../repository/VideoRep");
const ChunkRep_1 = require("../repository/ChunkRep");
class Video {
    async create(req, res) {
        const { videoId } = req.body;
        if (!videoId)
            return res.status(400).json({ message: "Campos com * obrigatório." });
        const create = VideoRep_1.videoRep.create({
            videoId,
            uri: `https://www.youtube.com/watch?v=${videoId}`
        });
        const registered = await VideoRep_1.videoRep.findOneBy({ videoId: String(create.videoId) });
        if (registered)
            return res.status(400).json({ message: "Vídeo already registered." });
        await VideoRep_1.videoRep.save(create);
        return res.status(201).json(create);
    }
    async findBy(req, res) {
        const { videoId, language } = req.body;
        const video = await VideoRep_1.videoRep.findOneBy({ videoId: String(videoId) });
        if (!video)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const chunks = await ChunkRep_1.chunkRep.findBy({ videoId: video.videoId, language: String(language) });
        const response = {
            video,
            chunks: chunks.map((item) => {
                return { timestamp: item.timestamp, text: item.text };
            })
        };
        return res.json(response);
    }
    async findall(req, res) {
        const video = await VideoRep_1.videoRep.find();
        if (!video)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const response = video.map(item => { return { uuid: item.uuid, videoid: item.videoId, uri: item.uri }; });
        return res.json(response);
    }
}
exports.Video = Video;
