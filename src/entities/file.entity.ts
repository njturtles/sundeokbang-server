import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './BaseTimeEntity';
import { Room } from './room.entity';

@Entity('files')
export class File extends BaseTimeEntity {
    @Column()
    url: string;

    @ManyToOne(() => Room, (room) => room.files)
    room: Room;
}
