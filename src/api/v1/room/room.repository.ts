import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Room } from '../../../entities/room.entity';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';
import { RoomStateType } from '../../../libs/common/state.type';
@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly repository: Repository<Room>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByUniversityName(
        universityName: string,
        query: FindRoomsQueryDto,
    ): Promise<[Room[], number]> {
        return this.repository.findAndCount({
            where: {
                university: { name: universityName },
                deposit: Between(query.minDeposit, query.maxDeposit),
                cost: Between(query.minCost, query.maxCost),
                state: RoomStateType.APPROVED,
            },
            relations: ['files'],
            select: [
                '_id',
                'name',
                'address',
                'latitude',
                'longitude',
                'contractType',
                'deposit',
                'cost',
            ],
        });
    }

    async findByFavorited(userId: number): Promise<[Room[], number]> {
        return this.repository.findAndCount({
            where: {
                favoritedBy: { _id: In([userId]) },
                state: RoomStateType.APPROVED,
            },
            relations: ['files'],
            select: [
                '_id',
                'name',
                'address',
                'latitude',
                'longitude',
                'contractType',
                'deposit',
                'cost',
            ],
        });
    }

    async findMyRooms(userId: number): Promise<[Room[], number]> {
        return this.repository.findAndCount({
            where: {
                ownerId: userId,
            },
            relations: ['files'],
            select: [
                '_id',
                'name',
                'address',
                'latitude',
                'longitude',
                'contractType',
                'deposit',
                'cost',
                'state',
            ],
        });
    }

    async findRoomsByConditions(
        minDeposit: number | null,
        maxDeposit: number | null,
        minCost: number | null,
        maxCost: number | null,
    ): Promise<Room[]> {
        const query = this.createQueryBuilder('room');

        if (minDeposit !== null)
            query.andWhere('room.deposit >= :minDeposit', { minDeposit });
        if (maxDeposit !== null)
            query.andWhere('room.deposit <= :maxDeposit', { maxDeposit });
        if (minCost !== null)
            query.andWhere('room.cost >= :minCost', { minCost });
        if (maxCost !== null)
            query.andWhere('room.cost <= :maxCost', { maxCost });

        return await query.getMany();
    }
}
