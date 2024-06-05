import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../../../libs/entity/room/room.entity';
import { RoomResponseDto } from '../dto/RoomResponse.dto';
import { RoomRepository } from '../repositroy/room.repository';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';
import { RoomFilterService } from './roomFilter.service';
import { Repository } from 'typeorm';
import { RoomMapper } from './roomMapper';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        private roomFilterService: RoomFilterService,
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

        const rooms = await this.roomRepository.findByUniversityName(
            university_name,
        );
        const filteredRooms = this.roomFilterService.filterRooms(
            rooms,
            depositRange,
            costRange,
        );

        const favorites = await this.findFavoritesByUserProviderId(providerId);
        return this.mapRoomsToResponse(filteredRooms, favorites);
    }

    private async findFavoritesByUserProviderId(
        providerId: string,
    ): Promise<Favorite[]> {
        return this.favoriteRepository.find({
            where: { user: { providerId } },
            relations: ['room'],
        });
    }

    private mapRoomsToResponse(
        rooms: Room[],
        favorites: Favorite[],
    ): RoomResponseDto[] {
        return rooms.map((room) => RoomMapper.toResponseDto(room, favorites));
    }
}
