import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity('picture')
export class Picture {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column('varchar', { length: 255 })
    imgUrl: string;
    @Column('varchar', { length: 30 })
    alt: string;
    @Column('varchar', { length: 25 })
    name: string;
    @Column('int', { length: 1, comment: '是否常用', default: 0 })
    used?: number
}