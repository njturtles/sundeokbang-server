import {
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { MockService } from './mock.service';

@Controller({ path: 'mock', version: '1' })
export class MockController {
    constructor(private readonly mockService: MockService) {}

    // 특정원룸 조회
    @Get('room/:id')
    async findOneByRoomId(@Param('id', ParseIntPipe) id: number) {
        const room = await this.mockService.findOneByRoomId(id);
        return room;
    }

    // 월세,전세 필터링 조회
    @Get('rooms')
    async findRoomsByUniversity(
        @Query('minDeposit', new DefaultValuePipe(0), ParseIntPipe)
        minDeposit: number,
        @Query('maxDeposit', new DefaultValuePipe(100000000), ParseIntPipe)
        maxDeposit: number,
        @Query('minCost', new DefaultValuePipe(0), ParseIntPipe)
        minCost: number,
        @Query('maxCost', new DefaultValuePipe(100000000), ParseIntPipe)
        maxCost: number,
    ): Promise<
        {
            id: number;
            name: string;
            address: string;
            latitude: number;
            longitude: number;
            deposit: number;
            cost: number;
            imageUrl: string[0];
            isFavorite: boolean;
        }[]
    > {
        const rooms = await this.mockService.findRoomsByPriceFilter(
            minDeposit,
            maxDeposit,
            minCost,
            maxCost,
        );
        return rooms;
    }

    @Get('favorites')
    async findRoomsByFavorites(): Promise<
        {
            id: number;
            name: string;
            address: string;
            latitude: number;
            longitude: number;
            deposit: number;
            cost: number;
            imageUrl: string[0];
            isFavorite: boolean;
        }[]
    > {
        return this.mockService.findRoomsByFavorites();
    }
}
