import { AppDataSource } from '../data-source'
import { Videos } from '../entities/Videos'

export const videoRep = AppDataSource.getRepository(Videos);