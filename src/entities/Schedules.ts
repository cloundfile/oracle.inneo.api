import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SCHEDULES')
export class Schedules {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'CODIGO'})
    codigo: string;

    @Column({ name: 'PARTIDA' })
    partida: String;

    @Column({name: 'CHEGADA'})
    chegada: String;

    @Column({name: 'RETORNO'})
    retorno: String;
}