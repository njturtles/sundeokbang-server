import {
    Controller,
    Query,
    Get,
    Param,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { MockService } from './mock.service';
import ApiError from 'src/libs/common-config/res/api.error';
import ApiCodes from 'src/libs/common-config/res/api.codes';
import ApiMessages from 'src/libs/common-config/res/api.messages';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정 원룸 조회
    @Get('room/:id')
    async getRoomById(@Param('id') id: number) {
        const roomId = Number(id);
        const room = await this.mockService.getRoomById(roomId);
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
            throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
                message: '올바른 위도와 경도를 입력해주세요',
            });
        }

        const nearbyRooms = await this.mockService.getRoomsNearBy(
            userLatitude,
            userLongitude,
        );
        return nearbyRooms;
    }
}
