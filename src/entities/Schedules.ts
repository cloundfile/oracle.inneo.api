import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SCHEDULES')
export class Schedules {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'COD'})
    cod: string;

    @Column({ name: 'SAIDA', type: 'timestamp' })
    saida: Date;

    @Column({name: 'CHEGADA', type: 'timestamp'})
    chegada: Date;

    @Column({name: 'RETORNO', type: 'timestamp'})
    retorno: Date;
}