import { Repository, DataSource } from 'typeorm';
import { User } from '../../../libs/entity/user/user.entity';
import { Room } from '../../../libs/entity/room/room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomResponseDto } from './dto/RoomResponse.dto';

@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private dataSource: DataSource,
    ) {
        super(
            roomRepository.target,
            roomRepository.manager,
            roomRepository.queryRunner,
        );
    }

    async findUserByProviderId(providerId: string): Promise<User> {
        return this.userRepository.findOne({
            where: { providerId },
            relations: ['university'],
        });
    }

    async findRoomsByUniversityIdAndFileters(
        universityId: number,
        userId: number,
        depositMin?: number,
        depositMax?: number,
        costMin?: number,
        costMax?: number,
    ): Promise<RoomResponseDto[]> {
        const query = this.roomRepository
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
                    AND favorite.user_id = :userId
                ) THEN 1 ELSE 0 END as isFavorite`,
            ])
            .leftJoin('room.university', 'university')
            .where('university._id = :universityId', { universityId })
            .setParameter('userId', userId);

        return query
            .andWhere(
                depositMin !== undefined && depositMax !== undefined
                    ? 'room.deposit BETWEEN :depositMin AND :depositMax'
                    : '1=1',
                { depositMin, depositMax },
            )
            .andWhere(
                costMin !== undefined && costMax !== undefined
                    ? 'room.cost BETWEEN :costMin AND :costMax'
                    : '1=1',
                { costMin, costMax },
            )
            .getRawMany()
            .then((rooms) =>
                rooms.map(
                    (room) =>
                        new RoomResponseDto(
                            room.id,
                            room.latitude,
                            room.longitude,
                            room.name,
                            room.address,
                            room.deposit,
                            room.cost,
                            Boolean(Number(room.isFavorite)),
                            room.imageUrl,
                        ),
                ),
            );
    }
}
