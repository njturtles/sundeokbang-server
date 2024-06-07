import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
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

    private applyFilters(
        query: SelectQueryBuilder<Room>,
        depositRange?: [number, number],
        costRange?: [number, number],
    ): SelectQueryBuilder<Room> {
        depositRange &&
            query.andWhere('room.deposit BETWEEN :depositMin AND :depositMax', {
                depositMin: depositRange[0],
                depositMax: depositRange[1],
            });

        costRange &&
            query.andWhere('room.cost BETWEEN :costMin AND :costMax', {
                costMin: costRange[0],
                costMax: costRange[1],
            });

        return query;
    }

    private async addFavoriteFlag(
        rooms: RoomResponseDto[],
        providerId?: string,
    ): Promise<RoomResponseDto[]> {
        const favoriteRoomId = providerId
            ? new Set(
                  (
                      await this.dataSource
                          .getRepository(Favorite)
                          .createQueryBuilder('favorite')
                          .innerJoin('favorite.room', 'room')
                          .innerJoin('favorite.user', 'user')
                          .where('user.providerId = :providerId', {
                              providerId,
                          })
                          .select(['favorite.room_id as room_id'])
                          .getRawMany()
                  ).map((fav) => fav.room_id),
              )
            : new Set();

        rooms.forEach((room) => {
            room.isFavorite = favoriteRoomId.has(room.id);
        });

        return rooms;
    }

    async findByUniversityNameAndFilters(
        universityName: string,
        depositRange?: [number, number],
        costRange?: [number, number],
        providerId?: string,
    ): Promise<RoomResponseDto[]> {
        let query = this.createQueryBuilder('room')
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

        query = this.applyFilters(query, depositRange, costRange);

        const rooms: RoomResponseDto[] = await query.getRawMany();

        return this.addFavoriteFlag(rooms, providerId);
    }
}
