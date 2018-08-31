import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Users } from './users';
@Entity('users_interface')
export class UsersInterface {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar', { length: 12 })
    interfaceName: string;
    @Column('varchar', { length: 12, comment: '模块', nullable: true })
    interfaceType: string;
    @Column('varchar', { length: 100 })
    interfaceUri: string;
    @Column('varchar', { length: 100, comment: '所属菜单列表', nullable: true })
    menuIds: string;
    @Column('varchar', { length: 100, comment: '描述', nullable: true })
    descriptor: string;
    @Column('int', { default: 1 })
    disabled: number;
}