import { AppDataSource } from '../data-source'
import { Usuarios } from '../entities/Usuario'

export const usuarioRep = AppDataSource.getRepository(Usuarios);