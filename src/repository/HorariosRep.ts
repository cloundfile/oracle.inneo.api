import { AppDataSource } from '../data-source'
import { Horarios } from '../entities/Horarios'

export const horariosRep = AppDataSource.getRepository(Horarios);