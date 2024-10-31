import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        UserModule,
        RoomModule,
        MockModule,
        AuthModule,
        FileModule,
        ChatModule,
    ],
})
export class V1Module {}
