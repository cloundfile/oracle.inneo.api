import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('CHUNKS')
@Unique('UNIQUE_UUID_AND_TEXT', ['uuid', 'text'])
export class Chunks {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'UUID'})
    uuid: string

    @Column({name: 'LANGUAGE'})
    language: string

    @Column({name: 'TIMESTAMP'})
    timestamp: Number

    @Column({name: 'TEXT'})
    text: string
}