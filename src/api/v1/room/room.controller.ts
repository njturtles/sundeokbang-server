import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { Payload } from '../auth/jwt/jwt.payload';
import { Room } from 'src/libs/entity/room/room.entity';

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
    ): Promise<Room[]> {
        const user = req.user as Payload;
        const providerId = user.providerId;
        const universityName = user.university;

        return this.roomService.getRoomsByUserUniversity(
            universityName,
            providerId,
            depositMin,
            depositMax,
            costMin,
            costMax,
        );
    }
}
