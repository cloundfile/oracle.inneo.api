import { AppDataSource } from '../data-source'
import { Chunks } from '../entities/Chunks'

export const chunkRep = AppDataSource.getRepository(Chunks);