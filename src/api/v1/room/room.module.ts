import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { File } from '../../../libs/entity/file/file.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Favorite, File])],
    providers: [RoomService],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
