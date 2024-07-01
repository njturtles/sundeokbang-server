import { Injectable } from '@nestjs/common';
import { rooms } from './room.data';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';
import { Room } from './room.interface';

@Injectable()
export class MockService {
    private rooms: Room[] = rooms;

    // 원룸 상세보기
    async findOneByRoomId(id: number): Promise<Room> {
        const room = this.rooms.find((room) => room._id === id);
        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당 원룸을 찾을 수 없습니다',
            });
        }
        return room;
    }

    // 특정 학교 원룸 조회
    async findRoomsByPrice(
        minDeposit?: number,
        maxDeposit?: number,
        minCost?: number,
        maxCost?: number,
    ): Promise<
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
        let filterPrice = this.rooms;

        if (minDeposit !== undefined) {
            filterPrice = filterPrice.filter(
                (room) => room.deposit >= minDeposit,
            );
        }

        if (maxDeposit !== undefined) {
            filterPrice = filterPrice.filter(
                (room) => room.deposit <= maxDeposit,
            );
        }

        if (minCost !== undefined) {
            filterPrice = filterPrice.filter((room) => room.cost >= minCost);
        }

        if (maxCost !== undefined) {
            filterPrice = filterPrice.filter((room) => room.cost <= maxCost);
        }

        const filterRooms = filterPrice.map((room) => ({
            _id: room._id,
            name: room.name,
            address: room.address,
            latitude: room.latitude,
            longitude: room.longitude,
            deposit: room.deposit,
            cost: room.cost,
            imageUrls: room.imageUrls,
        }));

        if (filterRooms.length === 0) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당 학교의 원룸을 찾을 수 없습니다',
            });
        }

        return filterRooms;
    }
}
