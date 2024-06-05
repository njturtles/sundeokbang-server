import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './repositroy/room.repository';
import { Room } from '../../../libs/entity/room/room.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { RoomFilterService } from './service/roomFilter.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Favorite])],
    providers: [RoomService, RoomFilterService, RoomRepository],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
