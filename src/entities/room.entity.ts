import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { BaseTimeEntity } from './BaseTimeEntity';
import { University } from './university.entity';
import { File } from './file.entity';
import { User } from './user.entity';
import { RoomResponse } from '../api/v1/room/room.interface';
import { instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Entity('rooms')
export class Room extends BaseTimeEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(() => University, (university) => university.rooms)
    university: University;

    @Column({ type: 'decimal', precision: 12, scale: 6 })
    latitude: number;

    @Column({ type: 'decimal', precision: 12, scale: 6 })
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

    @ManyToMany(() => User, (user) => user.favorites, { eager: true })
    @JoinTable()
    favoritedBy: User[];

    @IsOptional()
    isFavorite: boolean;

    toJSON() {
        return instanceToPlain(this);
    }

    async toRoom(userId: number): Promise<RoomResponse> {
        let favorited = false;
        favorited = this.favoritedBy.map((user) => user._id).includes(userId);
        const room: any = this.toJSON();
        delete room.favoritedBy;
        return { ...room, favorited };
    }
}
