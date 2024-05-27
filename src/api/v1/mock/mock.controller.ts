import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정 원룸 조회
    @Get('rooms/:id')
    async findOneByRoomId(@Param('id', ParseIntPipe) id: number) {
        const room = await this.mockService.findOneByRoomId(id);
        return room;
    }

    //특정지역 원룸조회
    @Get('schools/:school')
    async findRoomsBySchoolId(
        @Param('school', ParseIntPipe) school: number,
    ): Promise<
        {
            name: string;
            address: string;
            deposit: number;
            cost: number;
        }[]
    > {
        const rooms = await this.mockService.findRoomsBySchoolId(school);
        return rooms;
    }
}
