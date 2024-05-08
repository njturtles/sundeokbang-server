import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { FavoriteService } from './favorite/favorite.service';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
    controllers: [UserController, RoomController, FavoriteController],
    imports: [UserModule, RoomModule, FavoriteModule],
    providers: [FavoriteService],
})
export class V1Module {}
