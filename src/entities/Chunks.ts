import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('CHUNKS')
export class Chunks {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'UUID'})
    uuid: string

    @Column({name: 'LANGUAGE'})
    language: string

    @Column({name: 'TIMESTAMP'})
    timestamp: string

    @Column({name: 'TEXT'})
    text: string
}