import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { Payload } from '../auth/jwt/jwt.payload';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(
        @Req() req: Request,
        @Query('deposit') deposit?: string,
        @Query('cost') cost?: string,
    ): Promise<RoomResponseDto[]> {
        const user = req.user as Payload;
        const university_name = user.university;
        const providerId = user.providerId;

        return this.roomService.findRoomsByUniversityName(
            university_name,
            providerId,
            deposit,
            cost,
        );
    }
}
