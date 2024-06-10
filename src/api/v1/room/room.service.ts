import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async getRoomsByUserUniversity(
        universityName: string,
        providerId: string,
        depositMin?: number,
        depositMax?: number,
        costMin?: number,
        costMax?: number,
    ): Promise<any[]> {
        let query = this.roomRepository.createRoomQuery(
            universityName,
            providerId,
        );

        if (depositMin !== undefined && depositMax !== undefined) {
            query = this.roomRepository.applyDepositFilter(
                query,
                depositMin,
                depositMax,
            );
        }

        if (costMin !== undefined && costMax !== undefined) {
            query = this.roomRepository.applyCostFilter(
                query,
                costMin,
                costMax,
            );
        }

        return await query.getRawMany();
    }
}
