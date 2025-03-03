import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('VIDEOS')
export class Videos {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'VIDEOID'})
    videoId: string

    @Column({name: 'URI'})
    uri: string
}