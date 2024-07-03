import {
    Controller,
    Get,
    Req,
    UseGuards,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { Payload } from '../auth/jwt/jwt.payload';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllByUniversityName(
        @Req() req: Request,
        @Query('minDeposit', new DefaultValuePipe(0), ParseIntPipe)
        minDeposit: number,
        @Query('maxDeposit', new DefaultValuePipe(7000000), ParseIntPipe)
        maxDeposit?: number,
        @Query('minCost', new DefaultValuePipe(0), ParseIntPipe)
        minCost?: number,
        @Query('maxCost', new DefaultValuePipe(10000000), ParseIntPipe)
        maxCost?: number,
    ): Promise<{ count; rows }> {
        const user = req.user as Payload;
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
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        const user = req.user as Payload;
        const userId = user.userId;

        return this.roomService.findOneById(id, userId);
    }
}
