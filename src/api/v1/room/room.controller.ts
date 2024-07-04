import {
    Controller,
    Get,
    UseGuards,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Payload } from '../auth/jwt/jwt.payload';
import { User } from '../../../libs/decorators/user.decorator';
import { RoomList, RoomResponse } from './room.interface';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllByUniversityName(
        @User() user: Payload,
        @Query('minDeposit', new DefaultValuePipe(0), ParseIntPipe)
        minDeposit: number,
        @Query('maxDeposit', new DefaultValuePipe(7000000), ParseIntPipe)
        maxDeposit?: number,
        @Query('minCost', new DefaultValuePipe(0), ParseIntPipe)
        minCost?: number,
        @Query('maxCost', new DefaultValuePipe(10000000), ParseIntPipe)
        maxCost?: number,
    ): Promise<RoomList> {
        const universityName = user.university;
        const userId = user.userId;

        return this.roomService.findByUniversityName(
            universityName,
            userId,
            minDeposit,
            maxDeposit,
            minCost,
            maxCost,
        );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(
        @User() user: Payload,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RoomResponse> {
        return this.roomService.findOneById(id, user.userId);
    }
}
