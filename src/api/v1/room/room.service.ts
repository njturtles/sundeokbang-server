import { Injectable } from '@nestjs/common';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';
import { RoomRepository } from './room.repository';
import { RoomList, RoomResponse } from './room.interface';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';
import { User } from '../../../entities/user.entity';
import { University } from '../../../entities/university.entity';

@Injectable()
export class RoomService {
    constructor(private roomRepository: RoomRepository) {}

    async findByUniversityName(
        university: University,
        userId: number,
        query: FindRoomsQueryDto,
    ): Promise<RoomList> {
        const [rooms, count] = await this.roomRepository.findByUniversityName(
            university.name,
            query,
        );

        const roomList = await Promise.all(
            rooms.map((room) => room.toRoom(userId)),
        );

        return { count, rows: roomList };
    }

    async findOneById(roomId: number, userId: number): Promise<RoomResponse> {
        const room = await this.roomRepository.findOne({
            where: { _id: roomId },
            relations: ['files'],
        });

        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        return room.toRoom(userId);
    }

    async favoriteRoom(roomId: number, user: User): Promise<void> {
        const room = await this.roomRepository.findOne({
            where: { _id: roomId },
        });

        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        room.favoritedBy.push(user);

        await this.roomRepository.save(room);
    }

    async unfavoriteRoom(roomId: number, user: User): Promise<void> {
        const room = await this.roomRepository.findOne({
            where: { _id: roomId },
        });

        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        room.favoritedBy = room.favoritedBy.filter(
            (fav) => fav._id !== user._id,
        );

        await this.roomRepository.save(room);
    }
}
