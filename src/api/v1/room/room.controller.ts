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
    Put,
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
import { UpdateRoomDto } from './dto/UpdateRoom.dto';

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
        @Param('id', ParseIntPipe) rooId: number,
    ): Promise<RoomResponse> {
        return this.roomService.findOneById(rooId, user._id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async updateRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) rooId: number,
        @UploadedFiles() files: Express.MulterS3.File[],
        @Body() dto: UpdateRoomDto,
    ) {
        const updatedRoom = await this.roomService.updateRoom(
            dto,
            user._id,
            rooId,
        );

        await this.fileService.replace(updatedRoom, files);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) roomId: number,
    ) {
        await this.roomService.deleteRoom(roomId, user._id);
    }

    @Post(':id/favorite')
    @UseGuards(JwtAuthGuard)
    async favoriteRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) roomId: number,
    ): Promise<void> {
        await this.roomService.favoriteRoom(roomId, user);
    }

    @Delete(':id/favorite')
    @UseGuards(JwtAuthGuard)
    async unfavoriteRoom(
        @User() user: UserEntity,
        @Param('id', ParseIntPipe) rooId: number,
    ): Promise<void> {
        await this.roomService.unfavoriteRoom(rooId, user);
    }
}
