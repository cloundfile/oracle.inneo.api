import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('VIDEOS')
@Unique('UNIQUE_UUID_AND_TITLE', ['uuid', 'title'])
export class Videos {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number 

    @Column({name: 'UUID', nullable: false})
    uuid: string 
    
    @Column({name: 'TITLE', nullable: false})
    title: string

    @Column({name: 'DESCRIPTION', nullable: false})
    description: string
}