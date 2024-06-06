import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        private roomRepository: RoomRepository,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
    ) {}

    async findRoomsByUniversityName(
        university_name: string,
        providerId: string,
        deposit?: string,
        cost?: string,
    ): Promise<any[]> {
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
