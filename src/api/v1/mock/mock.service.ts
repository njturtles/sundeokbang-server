import { Injectable, NotFoundException } from '@nestjs/common';
import { rooms } from './room.data';
import { CalculatorUtil } from '../../../libs/utils';
import ApiError from 'src/libs/common-config/res/api.error';
import ApiCodes from 'src/libs/common-config/res/api.codes';
import ApiMessages from 'src/libs/common-config/res/api.messages';

@Injectable()
export class MockService {
    private rooms: any[] = rooms;
    private readonly calculatorUtil = CalculatorUtil;

    //원룸상세보기
    async getRoomById(id: number): Promise<any> {
        const room = this.rooms.find((room) => room._id === id);
        if (!room) {
            throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
                message: '해당원룸을 찾을 수 없습니다',
            });
        }
        return room;
    }

    // 사용자 위치에서 가까운 순서대로 원룸 목록을 반환
    async getRoomsNearBy(
        userLatitude: number,
        userLongitude: number,
    ): Promise<any[]> {
        return this.rooms
            .map((room) => ({
                ...room,
                distance: this.calculatorUtil.calculateDistance(
                    userLatitude,
                    userLongitude,
                    room.latitude,
                    room.longitude,
                ),
            }))
            .sort((a, b) => a.distance - b.distance);
    }
}
