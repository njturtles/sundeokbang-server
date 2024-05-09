import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Room } from '../room/room.entity';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity('favorites')
export class Favorite extends BaseTimeEntity {
    @ManyToOne(() => User, (user) => user.favorites)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Room, (room) => room.favorites)
    @JoinColumn({ name: 'room_id' })
    room: Room;
}
