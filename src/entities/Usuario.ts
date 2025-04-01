import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles";

@Entity('USUARIOS')
export class Usuarios {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'USERNAME'})
    username: string

    @Column({name: 'PASSWORD'})
    password: string

    @ManyToMany(() => Roles)
    @JoinTable({
        name: 'USUARIOS_ROLES',
        joinColumn: { name: 'USUARIOS_UUID', referencedColumnName: 'uuid' },
        inverseJoinColumn: { name: 'ROLE_UUID', referencedColumnName: 'uuid' }
    })
    roles: Roles[]; 
}