import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../../entities/room.entity';
import { RoomRepository } from './room.repository';
import { FileModule } from '../file/file.module';
import { University } from '../../../entities/university.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterConfigService } from '../file/multer.provider';
import { NaverMapService } from './services/naverMap.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room, University]),
        FileModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useClass: MulterConfigService,
            inject: [ConfigService],
        }),
    ],
    providers: [RoomService, RoomRepository, NaverMapService],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
