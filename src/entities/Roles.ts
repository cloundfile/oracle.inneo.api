import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('ROLES')
export class Roles {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'PERMISSION'})
    permission: string
}