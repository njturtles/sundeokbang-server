import { Module } from '@nestjs/common';
import { MockRoomService } from './mock_room.service';
import { MockRoomController } from './mock_room.controller';

@Module({
  controllers: [MockRoomController],
  providers: [MockRoomService],
})
export class MockRoomModule {}
