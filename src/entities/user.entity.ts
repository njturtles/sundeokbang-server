import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BaseTimeEntity } from './BaseTimeEntity';
import { University } from './university.entity';
import { Room } from './room.entity';

@Entity('users')
export class User extends BaseTimeEntity {
    @Column({ nullable: true })
    name: string;

    @Column({ unique: true })
    providerId: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => Room, (room) => room.favoritedBy)
    favorites: Room[];

    @ManyToOne(() => University, (university) => university.users)
    university: University;
}
