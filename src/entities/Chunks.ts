import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CHUNKS')
export class Chunks {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'VIDEOID'})
    videoId: string

    @Column({name: 'LANGUAGE'})
    language: string

    @Column({name: 'TIMESTAMP'})
    timestamp: string

    @Column({name: 'TEXT'})
    text: string
}