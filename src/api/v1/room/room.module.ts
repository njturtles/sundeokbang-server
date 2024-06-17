import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../../libs/entity/room/room.entity';
import { User } from '../../../libs/entity/user/user.entity';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Room, User, Favorite])],
    providers: [RoomService, RoomRepository],
    controllers: [RoomController],
})
export class RoomModule {}
