import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { Payload } from '../auth/jwt/jwt.payload';

@Controller({ path: 'room', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(
        @Req() req: Request,
        @Query('university_name') university_name: string,
    ): Promise<RoomResponseDto[]> {
        const user = req.user as Payload;
        const providerId = user.providerId;
        return this.roomService.findRoomsByUniversityName(
            university_name,
            providerId,
        );
    }
}
