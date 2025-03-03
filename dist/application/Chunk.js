"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const ChunkRep_1 = require("../repository/ChunkRep");
class Chunk {
    async create(req, res) {
        const { videoId, language, chunks } = req.body;
        if (!videoId || !language || !chunks) {
            return res.status(400).json({ message: "Campos com * obrigatório." });
        }
        for (const item of chunks) {
            const timestampJson = JSON.stringify(item.timestamp);
            const create = ChunkRep_1.chunkRep.create({
                videoId,
                language,
                timestamp: timestampJson,
                text: item.text
            });
            await ChunkRep_1.chunkRep.save(create);
        }
        return res.status(201).json(chunks);
    }
    async delete(req, res) {
        const { videoId, language } = req.body;
        if (!videoId || !language)
            return res.status(400).json({ message: "videoId and language são obrigatórios." });
        const chunks = await ChunkRep_1.chunkRep.findBy({ videoId: String(videoId), language: String(language) });
        if (!chunks)
            return res.status(400).json({ message: "videoId não encontrado." });
        chunks.map(async (item) => {
            await ChunkRep_1.chunkRep.delete(item.uuid);
        });
        return res.status(201).json({ message: videoId + " Deletado com sucesso." });
    }
    async findall(req, res) {
        const { videoId, language } = req.body;
        const chunks = await ChunkRep_1.chunkRep.findBy({ videoId: String(videoId), language: String(language) });
        if (!chunks)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const response = chunks.map(item => { return { uuid: item.uuid, videoid: item.videoId, timestamp: item.timestamp, text: item.text }; });
        return res.json(response);
    }
}
exports.Chunk = Chunk;
