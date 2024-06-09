import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { Payload } from '../auth/jwt/jwt.payload';
import { RoomResponseDto } from './dto/roomResponse.dto';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllByUniversityNameAndFilters(
        @Req() req: Request,
        @Query('depositMin') depositMin?: number,
        @Query('depositMax') depositMax?: number,
        @Query('costMin') costMin?: number,
        @Query('costMax') costMax?: number,
    ): Promise<RoomResponseDto[]> {
        const user = req.user as Payload;
        const providerId = user.providerId;

        return this.roomService.getRoomsByUserProviderId(
            providerId,
            depositMin,
            depositMax,
            costMin,
            costMax,
        );
    }
}
