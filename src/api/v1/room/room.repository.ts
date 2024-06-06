import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
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
    ): Promise<any[]> {
        const query = this.createQueryBuilder('room')
            .select([
                'room._id as id',
                'room.latitude',
                'room.longitude',
                'room.name',
                'room.address',
                'room.deposit',
                'room.cost',
                'files.url as imageUrl',
            ])
            .innerJoin(
                'room.university',
                'university',
                'university.name = :universityName',
                { universityName },
            )
            .leftJoin('room.files', 'files');

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

            const favoriteRoomIds = new Set(
                favorites.map((fav) => fav.room_id),
            );

            rooms.forEach((room) => {
                room.isFavorite = favoriteRoomIds.has(room.id);
            });
        }

        return rooms;
    }
}
