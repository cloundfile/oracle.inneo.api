import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('PONTOS')
export class Pontos {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'UUID', type: 'uuid'})
    uuid: string

    @Column({name: 'DESCRIPTION'})
    description: number

    @Column({name: 'ADDRESS'})
    address: number

    @Column({name: 'LATITUDE', type: 'float', precision: 10, scale: 6})
    latitude: number

    @Column({name: 'LONGITUDE', type: 'float', precision: 10, scale: 6})
    longitude: number
}