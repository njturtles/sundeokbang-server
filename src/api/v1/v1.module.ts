import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { FavoriteService } from './favorite/favorite.service';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteModule } from './favorite/favorite.module';
import { MockModule } from './mock/mock.module';
import { MockController } from './mock/mock.controller';
import { MockService } from './mock/mock.service';

@Module({
  controllers: [UserController, RoomController, FavoriteController, MockController],
  imports: [UserModule, RoomModule, FavoriteModule, MockModule],
  providers: [FavoriteService, MockService],
})
export class V1Module {}
