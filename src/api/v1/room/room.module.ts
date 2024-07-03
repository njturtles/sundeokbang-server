import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../../entities/room.entity';
import { RoomRepository } from './room.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    providers: [RoomService, RoomRepository],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
