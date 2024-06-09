import { Room } from '../../../../libs/entity/room/room.entity';

export class RoomDetailDto {
    room: Room;
    isFavorited: boolean;

    constructor(room: Room, isFavorited: boolean) {
        this.room = room;
        this.isFavorited = isFavorited;
    }
}
