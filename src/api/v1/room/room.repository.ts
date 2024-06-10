import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        private dataSource: DataSource,
    ) {
        super(
            roomRepository.target,
            roomRepository.manager,
            roomRepository.queryRunner,
        );
    }

    public createRoomQuery(
        universityName: string,
        providerId: string,
    ): SelectQueryBuilder<Room> {
        return this.roomRepository
            .createQueryBuilder('room')
            .select([
                'room._id as id',
                'room.latitude as latitude',
                'room.longitude as longitude',
                'room.name as name',
                'room.address as address',
                'room.deposit as deposit',
                'room.cost as cost',
                `(SELECT url FROM files WHERE files.room_id = room._id LIMIT 1) as imageUrl`,
                `CASE WHEN EXISTS (
                    SELECT 1 
                    FROM favorites favorite 
                    WHERE favorite.room_id = room._id 
                    AND favorite.user_id = (SELECT user._id FROM users user WHERE user.providerId = :providerId)
                ) THEN 1 ELSE 0 END as isFavorite`,
            ])
            .leftJoin('room.university', 'university')
            .where('university.name = :universityName', { universityName })
            .setParameter('providerId', providerId);
    }

    public applyDepositFilter(
        query: SelectQueryBuilder<Room>,
        depositMin: number,
        depositMax: number,
    ): SelectQueryBuilder<Room> {
        return query.andWhere(
            'room.deposit BETWEEN :depositMin AND :depositMax',
            {
                depositMin,
                depositMax,
            },
        );
    }

    public applyCostFilter(
        query: SelectQueryBuilder<Room>,
        costMin: number,
        costMax: number,
    ): SelectQueryBuilder<Room> {
        return query.andWhere('room.cost BETWEEN :costMin AND :costMax', {
            costMin,
            costMax,
        });
    }
}
