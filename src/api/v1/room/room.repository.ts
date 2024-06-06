import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';

@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room) private readonly repository: Repository<Room>,
        private dataSource: DataSource,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByUniversityNameAndFilters(
        universityName: string,
        depositRange?: [number, number],
        costRange?: [number, number],
        providerId?: string,
    ): Promise<RoomResponseDto[]> {
        const query = this.createQueryBuilder('room')
            .innerJoinAndSelect(
                'room.university',
                'university',
                'university.name = :universityName',
                { universityName },
            )
            .leftJoinAndSelect('room.files', 'files');

        if (depositRange) {
            query.andWhere('room.deposit BETWEEN :depositMin AND :depositMax', {
                depositMin: depositRange[0],
                depositMax: depositRange[1],
            });
        }

        if (costRange) {
            query.andWhere('room.cost BETWEEN :costMin AND :costMax', {
                costMin: costRange[0],
                costMax: costRange[1],
            });
        }

        const rooms = await query.getMany();

        let favoriteRoomId = new Set<number>();
        if (providerId) {
            const favorites = await this.dataSource
                .getRepository(Favorite)
                .createQueryBuilder('favorite')
                .innerJoin('favorite.room', 'room')
                .innerJoin('favorite.user', 'user')
                .where('user.providerId = :providerId', { providerId })
                .select(['favorite.room_id as room_id'])
                .getRawMany();

            favoriteRoomId = new Set(favorites.map((fav) => fav.room_id));
        }

        return rooms.map((room) =>
            this.mapToRoomResponseDto(room, favoriteRoomId),
        );
    }

    private mapToRoomResponseDto(
        room: Room,
        favoriteRoomIds: Set<number>,
    ): RoomResponseDto {
        return {
            id: room._id,
            latitude: room.latitude,
            longitude: room.longitude,
            name: room.name,
            address: room.address,
            deposit: room.deposit,
            cost: room.cost,
            isFavorite: favoriteRoomIds.has(room._id),
            imageUrl: room.files.length > 0 ? room.files[0].url : null,
        } as RoomResponseDto;
    }
}
