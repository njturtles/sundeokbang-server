import {
    Controller,
    Get,
    UseGuards,
    Query,
    ParseIntPipe,
    Param,
    Post,
    Delete,
    Body,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { RoomService } from './services/room.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../../../libs/decorators/user.decorator';
import { RoomList, RoomResponse } from './room.interface';
import { FindRoomsQueryDto } from './dto/FindRoomsQuery.dto';
import { User as UserEntity } from '../../../entities/user.entity';
import { CreateRoomDto } from './dto/CreateRoom.dto';
import { FileService } from '../file/file.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'rooms', version: '1' })
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
        private readonly fileService: FileService,
    ) {}

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

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async createRoom(
        @Body() dto: CreateRoomDto,
        @User() user: UserEntity,
        @UploadedFiles() files: Express.MulterS3.File[],
    ) {
        const room = await this.roomService.createRoom(dto, user._id);

        await this.fileService.create(room, files);
    }

    @Get('my')
    @UseGuards(JwtAuthGuard)
    async findMyRooms(@User() user: UserEntity): Promise<RoomList> {
        return this.roomService.findMyRooms(user._id);
    }

    @Get('/favorites')
    @UseGuards(JwtAuthGuard)
    async findByFavorited(@User() user: UserEntity): Promise<RoomList> {
        return this.roomService.findByFavorited(user._id);
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
