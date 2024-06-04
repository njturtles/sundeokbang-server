import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
<<<<<<< HEAD

@Module({
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/libs/entity/room/room.entity';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Favorite])],
>>>>>>> 1670974 (브랜치 오류수정)
    controllers: [RoomController],
    providers: [RoomService],
})
export class RoomModule {}
