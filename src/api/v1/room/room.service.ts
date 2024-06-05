import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { RoomRepository } from './room.repository';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
        @InjectRepository(FavoriteRepository)
        private favoriteRepository: FavoriteRepository,
    ) {}

    async findRoomsByUniversityName(
        university_name: string,
        providerId: string,
    ): Promise<RoomResponseDto[]> {
        const rooms = await this.roomRepository.findByUniversityName(
            university_name,
        );
        const favorites = await this.favoriteRepository.findByUserProviderId(
            providerId,
        );

        return rooms.map((room) => {
            const isFavorite = favorites.some(
                (fav) => fav.room._id === room._id,
            );

            const plainRoom = instanceToPlain(room);
            plainRoom.isFavorite = isFavorite;
            plainRoom.imageUrl =
                room.files.length > 0 ? room.files[0].url : null;

            return plainToInstance(RoomResponseDto, plainRoom, {
                excludeExtraneousValues: true,
            });
        });
    }
}
