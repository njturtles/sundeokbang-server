import { Injectable } from '@nestjs/common';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';
import { RoomRepository } from './room.repository';
import { RoomList, RoomResponse } from './room.interface';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';

@Injectable()
export class RoomService {
    constructor(private roomRepository: RoomRepository) {}

    async findByUniversityName(
        universityName: string,
        userId: number,
        query: FindRoomsQueryDto,
    ): Promise<RoomList> {
        const [rooms, count] = await this.roomRepository.findByUniversityName(
            universityName,
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
}
