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
    @Get('university/:university_name')
    async findRoomsByUniversitylName(
        @Param('university_name') university_name: string,
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
        const rooms = await this.mockService.findRoomsByUniversitylName(
            university_name,
        );
        return rooms;
    }
}
