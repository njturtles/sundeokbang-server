import { Injectable, NotFoundException } from '@nestjs/common';
import { rooms } from './room.data';
import ApiError from 'src/libs/common-config/res/api.error';
import ApiCodes from 'src/libs/common-config/res/api.codes';
import ApiMessages from 'src/libs/common-config/res/api.messages';
import { Room } from './room.interface';

@Injectable()
export class MockService {
    private rooms: Room[] = rooms;

    //원룸상세보기
    async getRoomsById(id: number): Promise<Room> {
        const room = this.rooms.find((room) => room._id === id);
        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당원룸을 찾을 수 없습니다',
            });
        }
        return room;
    }

    //특정학교 원룸조회
    async getRoomsBySchool(school: number): Promise<Room[]> {
        const filteredRooms = this.rooms.filter(
            (room) => room.school === school,
        );
        if (filteredRooms.length === 0) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당 학교의 원룸을 찾을 수 없습니다',
            });
        }
        return filteredRooms;
    }
}
