import { AppDataSource } from '../data-source'
import { Schedules } from '../entities/Schedules'

export const schedulesRep = AppDataSource.getRepository(Schedules);