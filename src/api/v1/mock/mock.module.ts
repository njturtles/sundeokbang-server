import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule {}
