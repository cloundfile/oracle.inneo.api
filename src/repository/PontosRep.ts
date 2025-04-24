import { AppDataSource } from '../data-source'
import { Pontos } from '../entities/Pontos'

export const pontosRep = AppDataSource.getRepository(Pontos);