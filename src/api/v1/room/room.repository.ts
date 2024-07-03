import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Room } from '../../../entities/room.entity';
import { instanceToPlain } from 'class-transformer';
import { RoomResponse } from './room.interface';

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
        minDeposit: number,
        maxDeposit: number,
        minCost: number,
        maxCost: number,
    ): Promise<[Room[], number]> {
        return this.repository.findAndCount({
            where: {
                university: { name: universityName },
                deposit: Between(minDeposit, maxDeposit),
                cost: Between(minCost, maxCost),
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

    async toRoom(room: Room, userId: number): Promise<RoomResponse> {
        let favorited = false;

        favorited = room.favoritedBy.map((user) => user._id).includes(userId);

        const roomData: any = instanceToPlain(room);
        delete roomData.favoritedBy;
        return { ...roomData, favorited };
    }
}
