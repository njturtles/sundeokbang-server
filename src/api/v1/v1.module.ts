import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { FavoriteModule } from './favorite/favorite.module';
import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [UserModule, RoomModule, FavoriteModule, MockModule, AuthModule],
})
export class V1Module {}
