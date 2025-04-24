import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('HORARIOS')
export class Horarios {
    @PrimaryGeneratedColumn({name: 'ID'})
    id: number

    @Column({name: 'UUID', type: 'uuid'})
    uuid: string

    @Column({ name: 'SAIDA', type: 'varchar', length: 8  })
    saida: string;

    @Column({ name: 'CHEGADA', type: 'varchar', length: 8  })
    chegada: string;
}