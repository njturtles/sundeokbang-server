import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Favorite } from '../favorite/favorite.entity';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { University } from '../university/university.entity';

@Entity('users')
export class User extends BaseTimeEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];

    @ManyToOne(() => University, (university) => university.users)
    university: University;
}
