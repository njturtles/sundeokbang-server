import {
    Controller,
    Get,
    UseGuards,
    Query,
    ParseIntPipe,
    Param,
    Post,
    Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../../../libs/decorators/user.decorator';
import { RoomList, RoomResponse } from './room.interface';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';
import { User as UserEntity } from '../../../entities/user.entity';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllByUniversityName(
        @User() user: UserEntity,
        @Query() query: FindRoomsQueryDto,
    ): Promise<RoomList> {
        return this.roomService.findByUniversityName(
            user.university,
            user._id,
            query,
        );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<RoomResponse> {
        return this.roomService.findOneById(id, user._id);
    }

    @Post(':id/favorite')
    @UseGuards(JwtAuthGuard)
    async favoriteRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        await this.roomService.favoriteRoom(id, user);
    }

    @Delete(':id/favorite')
    @UseGuards(JwtAuthGuard)
    async unfavoriteRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        await this.roomService.unfavoriteRoom(id, user);
    }
}
