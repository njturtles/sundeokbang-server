import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { Repository } from 'typeorm';
import { RoomResponseDto } from './dto/RoomResponse.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        private roomRepository: RoomRepository,
    ) {}

    async findRoomsByUniversityName(
        university_name: string,
        providerId: string,
        deposit?: string,
        cost?: string,
    ): Promise<RoomResponseDto[]> {
        const depositRange = deposit
            ? (deposit.split(',').map(Number) as [number, number])
            : undefined;
        const costRange = cost
            ? (cost.split(',').map(Number) as [number, number])
            : undefined;

        const rooms = await this.roomRepository.findByUniversityNameAndFilters(
            university_name,
            depositRange,
            costRange,
            providerId,
        );

        return rooms;
    }
}
