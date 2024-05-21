import { Entity, Column, OneToMany } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { User } from '../user/user.entity';
import { Room } from '../room/room.entity';

@Entity('university')
export class University extends BaseTimeEntity {
    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longtitude: number;

    @OneToMany(() => User, (user) => user.university)
    users: User[];

    @OneToMany(() => Room, (room) => room.university)
    rooms: Room[];
}
