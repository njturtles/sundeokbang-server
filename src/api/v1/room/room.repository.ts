import { Repository, DataSource } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        private dataSource: DataSource,
    ) {
        super(roomRepository.target, roomRepository.manager, roomRepository.queryRunner);
    }
    
    private applyDepositFilter(query, depositMin?: number, depositMax?: number) {
        if (depositMin !== undefined && depositMax !== undefined) {
            query.andWhere('room.deposit BETWEEN :depositMin AND :depositMax', {
                depositMin,
                depositMax,
            });
        }
        return query;
    }

    private applyCostFilter(query, costMin?: number, costMax?: number) {
        if (costMin !== undefined && costMax !== undefined) {
            query.andWhere('room.cost BETWEEN :costMin AND :costMax', {
                costMin,
                costMax,
            });
        }
        return query;
    }

    async findRoomsByUniversityNameAndFilters(
        universityName: string,
        providerId: string,
        depositMin?: number,
        depositMax?: number,
        costMin?: number,
        costMax?: number,
    ): Promise<RoomResponseDto[]> {
        const query = await this.roomRepository
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

        this.applyDepositFilter(query, depositMin, depositMax);
        this.applyCostFilter(query, costMin, costMax);

        const rooms = await query.getRawMany();

        return rooms.map((room) =>
            plainToClass(RoomResponseDto, room, {
                excludeExtraneousValues: true,
            }),
        );
    }
}
