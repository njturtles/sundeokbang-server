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

    //월세,전세 필터링 조회
    async findRoomsByPriceFilter(
        minDeposit: number,
        maxDeposit: number,
        minCost: number,
        maxCost: number,
    ): Promise<
        {
            id: number;
            name: string;
            address: string;
            latitude: number;
            longitude: number;
            deposit: number;
            cost: number;
            imageUrl: string;
            isFavorite: boolean;
        }[]
    > {
        let filterPrice = this.rooms.filter(
            (room) =>
                room.deposit >= minDeposit &&
                room.deposit <= maxDeposit &&
                room.cost >= minCost &&
                room.cost <= maxCost,
        );

        const filterRooms = filterPrice.map((room) => ({
            id: room._id,
            name: room.name,
            address: room.address,
            latitude: room.latitude,
            longitude: room.longitude,
            deposit: room.deposit,
            cost: room.cost,
            imageUrl: room.imageUrls[0],
            isFavorite: room.isFavorite,
        }));

        if (filterRooms.length === 0) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND, {
                message: '해당 학교의 원룸을 찾을 수 없습니다',
            });
        }

        return filterRooms;
    }

    //즐겨찾기 조회 및 필터링
    async findRoomsByFavorites(
        minDeposit: number,
        maxDeposit: number,
        minCost: number,
        maxCost: number,
    ): Promise<
        {
            id: number;
            name: string;
            address: string;
            latitude: number;
            longitude: number;
            deposit: number;
            cost: number;
            imageUrl: string;
            isFavorite: boolean;
        }[]
    > {
        let filterPriceAndFavorites = this.rooms.filter(
            (room) =>
                room.deposit >= minDeposit &&
                room.deposit <= maxDeposit &&
                room.cost >= minCost &&
                room.cost <= maxCost &&
                room.isFavorite === true,
        );

        const filterFavoriteRooms = filterPriceAndFavorites.map((room) => ({
            id: room._id,
            name: room.name,
            address: room.address,
            latitude: room.latitude,
            longitude: room.longitude,
            deposit: room.deposit,
            cost: room.cost,
            imageUrl: room.imageUrls[0],
            isFavorite: room.isFavorite,
        }));

        return filterFavoriteRooms;
    }
}
