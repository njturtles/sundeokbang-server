import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { RoomResponseDto } from './dto/RoomResponse.dto';

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
    ): Promise<RoomResponseDto[]> {
        return this.roomRepository.findRoomsByUniversityNameAndFilters(
            universityName,
            providerId,
            depositMin,
            depositMax,
            costMin,
            costMax,
        );
    }
}
