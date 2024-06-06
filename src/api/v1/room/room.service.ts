import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { RoomRepository } from './room.repository';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';
import { RoomFilterService } from './roomFilter.service';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
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

        const favorites = await this.favoriteRepository.find({
            where: { user: { providerId } },
            relations: ['room'],
        });

        return filteredRooms.map((room) => {
            const isFavorite = favorites.some(
                (fav) => fav.room._id === room._id,
            );

            return {
                id: room._id,
                latitude: room.latitude,
                longitude: room.longitude,
                name: room.name,
                address: room.address,
                deposit: room.deposit,
                cost: room.cost,
                isFavorite,
                imageUrl: room.files.length > 0 ? room.files[0].url : null,
            } as RoomResponseDto;
        });
    }
}
