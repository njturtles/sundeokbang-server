import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MockService } from 'src/api/v1/mock/mock.service';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정 원룸 조회
    @Get('room/:id')
    async getRoomsById(@Param('id', ParseIntPipe) id: number) {
        const room = await this.mockService.getRoomsById(id);
        return room;
    }

    //특정지역 원룸조회
    @Get('rooms/:school')
    async getRoomsBySchool(
        @Param('school', ParseIntPipe) school: number,
    ): Promise<
        {
            name: string;
            address: string;
            deposit: number;
            cost: number;
        }[]
    > {
        const rooms = await this.mockService.getRoomsBySchool(school);
        return rooms;
    }
}
