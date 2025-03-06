import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('VIDEOS')
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