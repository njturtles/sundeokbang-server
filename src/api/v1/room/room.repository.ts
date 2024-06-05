import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Room } from '../../../libs/entity/room/room.entity';

@Injectable()
export class RoomRepository extends Repository<Room> {
    constructor(
        @InjectRepository(Room) private readonly repository: Repository<Room>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByUniversityName(universityName: string): Promise<Room[]> {
        return this.repository
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
    }
}
