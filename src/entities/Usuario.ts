import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('USUARIOS')
export class Usuarios {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'USERNAME'})
    username: string

    @Column({name: 'PASSWORD'})
    password: string
}