import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
    ) {}

    async findRoomsByUniversitylName(
        universityName: string,
        userId: number,
    ): Promise<Room[]> {
        const rooms = await this.roomRepository
            .createQueryBuilder('room')
            .innerJoinAndSelect(
                'room.university',
                'university',
                'university.name = :universityName',
                { universityName },
            )
            .leftJoinAndSelect('room.favorites', 'favorites')
            .leftJoinAndSelect('room.files', 'files')
            .getMany();

        const favorites = await this.favoriteRepository.find({
            where: { user: { _id: userId } },
            relations: ['room'],
        });

        return rooms.map((room) => {
            const isFavorite = favorites.some(
                (fav) => fav.room._id === room._id,
            );
            return {
                ...room,
                isFavorite,
            };
        });
    }
}
