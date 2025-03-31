import { AppDataSource } from '../data-source'
import { Roles } from '../entities/Roles'

export const rolesRep = AppDataSource.getRepository(Roles);