import { Module } from '@nestjs/common';
import { MockFavoriteController } from './favorite.controller';
import { MockFavoriteService } from './favorite.service';

@Module({
  controllers: [MockFavoriteController],
  providers: [MockFavoriteService],
})
export class MockFavoriteModule {}
