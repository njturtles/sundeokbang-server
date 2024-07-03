import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MockService } from './mock.service';
import { Room } from './room.interface';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정원룸 조회
    @Get('rooms/:id')
    async findOneByRoomId(@Param('id', ParseIntPipe) id: number) {
        const room = await this.mockService.findOneByRoomId(id);
        return room;
    }

    // 월세,전세 필터링 조회
    @Get()
    async findRoomsByUniversitylName(
        @Query('minDepoist') minDepoist?: string,
        @Query('maxDeposit') maxDeposit?: string,
        @Query('minCost') minCost?: string,
        @Query('maxCost') maxCost?: string,
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
        const minDepositPrice = minDepoist ? Number(minDepoist) : undefined;
        const maxDepositPrice = maxDeposit ? Number(maxDeposit) : undefined;
        const minCostPrice = minCost ? Number(minCost) : undefined;
        const maxCostPrice = maxCost ? Number(maxCost) : undefined;

        const rooms = await this.mockService.findRoomsByPrice(
            minDepositPrice,
            maxDepositPrice,
            minCostPrice,
            maxCostPrice,
        );
        return rooms;
    }
}
