import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { Room } from '../../../libs/entity/room/room.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { RoomFilterService } from './roomFilter.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Favorite])],
    providers: [RoomService, RoomFilterService, RoomRepository],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
