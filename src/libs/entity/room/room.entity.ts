import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Favorite } from '../favorite/favorite.entity';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { University } from '../university/university.entity';
import { File } from '../file/file.entity';

@Entity('rooms')
export class Room extends BaseTimeEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(() => University, (university) => university.rooms)
    university: University;

    @Column({ nullable: true })
    latitude: number;

    @Column({ nullable: true })
    longitude: number;

    @Column()
    contractType: string;

    @Column()
    deposit: number;

    @Column()
    cost: number;

    @Column()
    term: string;

    @Column()
    maintenanceCost: number;

    @Column({ nullable: true })
    commonArea: string;

    @Column()
    type: string;

    @Column()
    exclusiveArea: number;

    @Column()
    parking: boolean;

    @Column()
    heatingSystem: string;

    @Column()
    furniture: string;

    @Column()
    appliances: string;

    @Column()
    prevention: string;

    @Column({ nullable: true })
    etc: string;

    @Column({ type: 'text', nullable: true })
    detail: string;

    @Column()
    phone: string;

    @Column()
    owner: string;

    @OneToMany(() => File, (file) => file.room)
    files: File[];

    @OneToMany(() => Favorite, (favorite) => favorite.room)
    favorites: Favorite[];
}
