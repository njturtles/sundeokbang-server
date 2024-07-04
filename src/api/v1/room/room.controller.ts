import {
    Controller,
    Get,
    UseGuards,
    Query,
    ParseIntPipe,
    Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Payload } from '../auth/jwt/jwt.payload';
import { User } from '../../../libs/decorators/user.decorator';
import { RoomList, RoomResponse } from './room.interface';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllByUniversityName(
        @User() user: Payload,
        @Query() query: FindRoomsQueryDto,
    ): Promise<RoomList> {
        return this.roomService.findByUniversityName(
            user.university,
            user.userId,
            query,
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
