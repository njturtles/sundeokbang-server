import { Entity, Column, OneToMany } from 'typeorm';
import { Favorite } from '../favorite/favorite.entity';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity('users')
export class User extends BaseTimeEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    school: string;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];
}
