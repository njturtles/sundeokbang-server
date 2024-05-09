import {
    Controller,
    Query,
    Get,
    Param,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { MockService } from './mock.service';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정 원룸 조회
    @Get('room/:id')
    async getRoomById(@Param('id') id: string) {
        const roomId = Number(id);
        if (isNaN(roomId)) {
            throw new NotFoundException(`유효한 ID가 아닙니다`);
        }

        const room = await this.mockService.getRoomById(roomId);
        if (!room) {
            throw new NotFoundException(`해당 원룸을 찾을 수 없습니다`);
        }

        return room;
    }

    //가까운 순서대로 마커표시
    @Get('rooms/nearby')
    async getNearbyRooms(
        @Query('latitude') latitude: string,
        @Query('longitude') longitude: string,
    ): Promise<any[]> {
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        if (isNaN(userLatitude) || isNaN(userLongitude)) {
            throw new BadRequestException(
                '유효한 위도와 경도를 입력해야 합니다.',
            );
        }

        const nearbyRooms = await this.mockService.getRoomsByProximity(
            userLatitude,
            userLongitude,
        );
        return nearbyRooms;
    }
}
