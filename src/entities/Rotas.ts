import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ROTAS')
export class Rotas {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({ name: 'UUID', type: 'uuid' })
    uuid: string;
  
    @Column({ name: 'ALTITUDE', type: 'float', precision: 10, scale: 6 })
    altitude: number;
  
    @Column({ name: 'LATITUDE', type: 'float', precision: 10, scale: 6 })
    latitude: number;
  
    @Column({ name: 'LONGITUDE', type: 'float', precision: 10, scale: 6 })
    longitude: number;
}