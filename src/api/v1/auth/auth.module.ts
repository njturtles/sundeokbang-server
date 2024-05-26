import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KakaoStrategy } from './kakao/kakao.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                secret: env.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: env.get<string>('JWT_EXPIRES_IN') },
            }),
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, KakaoStrategy, JwtStrategy],
})
export class AuthModule {}
