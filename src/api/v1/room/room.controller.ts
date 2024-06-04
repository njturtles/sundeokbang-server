<<<<<<< HEAD
import { Controller } from '@nestjs/common';

@Controller('rooms')
export class RoomController {}
=======
import { Controller, Get, Req, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { RoomResponseDto } from './dto/room-response.dto';
import { TransformInterceptor } from '../../../libs/common-config/interceptors/transform.interceptor';

@Controller({ path: 'room', version: '1' })
@UseInterceptors(new TransformInterceptor(RoomResponseDto))
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(
        @Req() req: Request,
        @Query('university_name') universityName: string,
    ): Promise<any> { // RoomResponseDto[] 대신 any를 사용
        const userId = req.cookies.user_id;
        return this.roomService.findRoomsByUniversitylName(universityName, userId);
    }
}
>>>>>>> 1670974 (브랜치 오류수정)
