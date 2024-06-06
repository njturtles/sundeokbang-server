import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { RoomResponseDto } from './dto/RoomResponse.dto';

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
        deposit?: string,
        cost?: string,
        providerId?: string,
    ): Promise<RoomResponseDto[]> {
        const query = this.createQueryBuilder('room')
            .select([
                'room._id as id',
                'room.latitude as latitude',
                'room.longitude as longitude',
                'room.name as name',
                'room.address as address',
                'room.deposit as deposit',
                'room.cost as cost',
                `(SELECT url FROM files WHERE files.room_id = room._id LIMIT 1) as imageUrl`,
            ])
            .innerJoin(
                'room.university',
                'university',
                'university.name = :universityName',
                { universityName },
            );

        if (deposit) {
            const [depositMin, depositMax] = deposit.split(',').map(Number);
            query.andWhere('room.deposit BETWEEN :depositMin AND :depositMax', {
                depositMin,
                depositMax,
            });
        }

        if (cost) {
            const [costMin, costMax] = cost.split(',').map(Number);
            query.andWhere('room.cost BETWEEN :costMin AND :costMax', {
                costMin,
                costMax,
            });
        }

        const rooms = await query.getRawMany();

        if (providerId) {
            const favorites = await this.dataSource
                .getRepository(Favorite)
                .createQueryBuilder('favorite')
                .innerJoin('favorite.room', 'room')
                .innerJoin('favorite.user', 'user')
                .where('user.providerId = :providerId', { providerId })
                .select(['favorite.room_id as room_id'])
                .getRawMany();

            const favoriteRoomId = new Set(favorites.map((fav) => fav.room_id));

            rooms.forEach((room) => {
                room.isFavorite = favoriteRoomId.has(room.id);
            });
        }

        return rooms.map(
            (room) =>
                new RoomResponseDto(
                    room.id,
                    room.latitude,
                    room.longitude,
                    room.name,
                    room.address,
                    room.deposit,
                    room.cost,
                    room.isFavorite,
                    room.imageUrl,
                ),
        );
    }
}
