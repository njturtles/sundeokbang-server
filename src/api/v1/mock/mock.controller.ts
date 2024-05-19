import { Controller, Get, Param } from '@nestjs/common';
import { MockService } from './mock.service';
import { Room } from './room.interface';

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

    //특정지역 원룸조회
    @Get('rooms/:area')
    async findByArea(@Param('area') area:string) : Promise<Room[]> {
        return this.mockService.findByArea(area);
    }
}
