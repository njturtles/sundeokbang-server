import { Injectable, NotFoundException } from '@nestjs/common';
import { rooms } from './room';
import { CalculatorUtil } from 'src/libs/util/calculator.util';

@Injectable()
export class MockService {
    private rooms: any[] = rooms;
    private calculatorUtil: CalculatorUtil = new CalculatorUtil();

    //원룸상세보기
    async getRoomById(id: number): Promise<any> {
        const room = this.rooms.find((room) => room._id === id);
        if (!room) {
            throw new NotFoundException('해당 원룸을 찾을 수 없습니다.');
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
