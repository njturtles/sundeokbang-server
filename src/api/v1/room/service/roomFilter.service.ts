import { Injectable } from '@nestjs/common';
import { Room } from '../../../../libs/entity/room/room.entity';

@Injectable()
export class RoomFilterService {
    filterRooms(
        rooms: Room[],
        depositRange?: [number, number],
        costRange?: [number, number],
    ): Room[] {
        return rooms.filter((room) => {
            const depositMatch =
                !depositRange ||
                (room.deposit >= depositRange[0] &&
                    room.deposit <= depositRange[1]);
            const costMatch =
                !costRange ||
                (room.cost >= costRange[0] && room.cost <= costRange[1]);
            return depositMatch && costMatch;
        });
    }
}
