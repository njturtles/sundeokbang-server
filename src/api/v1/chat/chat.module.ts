import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../../entities/room.entity';
import { RoomModule } from '../room/room.module';

@Module({
    imports: [RoomModule, TypeOrmModule.forFeature([Room])],
    providers: [ChatService],
    controllers: [ChatController],
})
export class ChatModule {}
