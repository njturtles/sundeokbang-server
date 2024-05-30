import { Injectable } from '@nestjs/common';
import { rooms } from './room.data';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';
import { Room } from './room.interface';

@Injectable()
export class MockService {
    private rooms: Room[] = rooms;

    //원룸상세보기
    async findOneByRoomId(id: number): Promise<Room> {
        const room = this.rooms.find((room) => room._id === id);
        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당원룸을 찾을 수 없습니다',
            });
        }
        return room;
    }

    //특정학교 원룸조회
    async findRoomsByUniversitylName(university_name: string): Promise<
        {
            _id: number;
            name: string;
            address: string;
            latitude: number;
            longitude: number;
            deposit: number;
            cost: number;
            imageUrls: string[];
        }[]
    > {
        const filteredRooms = this.rooms
            .filter((room) => room.university_name === university_name)
            .map((room) => ({
                _id: room._id,
                name: room.name,
                address: room.address,
                latitude: room.latitude,
                longitude: room.longitude,
                deposit: room.deposit,
                cost: room.cost,
                imageUrls: room.imageUrls,
            }));
        if (filteredRooms.length === 0) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당 학교의 원룸을 찾을 수 없습니다',
            });
        }
        return filteredRooms;
    }
}
