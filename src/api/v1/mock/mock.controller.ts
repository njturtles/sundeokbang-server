import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { MockService } from './mock.service';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

<<<<<<< HEAD
    // 특정 원룸 조회
=======
    //특정원룸 조회
>>>>>>> 1670974 (브랜치 오류수정)
    @Get('rooms/:id')
    async findOneByRoomId(@Param('id', ParseIntPipe) id: number) {
        const room = await this.mockService.findOneByRoomId(id);
        return room;
    }

<<<<<<< HEAD
    //특정지역 원룸조회
=======
    //특정대학 원룸조회
>>>>>>> 1670974 (브랜치 오류수정)
    @Get('rooms')
    async findRoomsByUniversitylName(
        @Query('university_name') university_name: string,
        @Query('deposit') deposit?: string,
        @Query('cost') cost?: string,
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
        let depositRange: [number, number] | undefined;
        let costRange: [number, number] | undefined;

        if (deposit) {
            const [minDeposit, maxDeposit] = deposit.split(',').map(Number);
            depositRange = [minDeposit, maxDeposit];
        }

        if (cost) {
            const [minCost, maxCost] = cost.split(',').map(Number);
            costRange = [minCost, maxCost];
        }

        const rooms = await this.mockService.findRoomsByUniversitylName(
            university_name,
            depositRange,
            costRange,
        );
        return rooms;
    }
}
