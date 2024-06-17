import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { Room } from 'src/libs/entity/room/room.entity';

@Injectable()
export class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async findRoomsByUniversityAndFileters(
        universityName: string,
        providerId: string,
        depositMin?: string,
        depositMax?: string,
        costMin?: string,
        costMax?: string,
    ): Promise<Room[]> {
        let query = this.roomRepository.findRoomsByUniversity(
            universityName,
            providerId,
        );

        if (depositMin !== undefined && depositMax !== undefined) {
            query = this.roomRepository.filterByDepositRange(
                query,
                depositMin,
                depositMax,
            );
        }

        if (costMin !== undefined && costMax !== undefined) {
            query = this.roomRepository.filterByCostRange(
                query,
                costMin,
                costMax,
            );
        }

        const rooms = await query.getRawMany();
        return rooms;
    }
}
