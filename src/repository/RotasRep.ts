import { AppDataSource } from '../data-source'
import { Rotas } from '../entities/Rotas'

export const rotasRep = AppDataSource.getRepository(Rotas);