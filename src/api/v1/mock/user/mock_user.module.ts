import { Module } from '@nestjs/common';
import { MockUserController } from './mock_user.controller';
import { MockUserService } from './mock_user.service';

@Module({
  controllers: [MockUserController],
  providers: [MockUserService],
})
export class MockUserModule {}
