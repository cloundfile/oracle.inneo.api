import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SCHEDULES')
export class Schedules {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'COD'})
    cod: string;

    @Column({ name: 'SAIDA' })
    saida: String;

    @Column({name: 'CHEGADA'})
    chegada: String;

    @Column({name: 'RETORNO'})
    retorno: String;
}