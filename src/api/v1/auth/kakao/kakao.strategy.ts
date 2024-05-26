import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { CallBackUserDataDto } from '../dto/CallBackUser.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly env: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            clientID: env.get<string>('KAKAO_REST_API_KEY'),
            clientSecret: env.get<string>('KAKAO_CLIENT_SECRET'),
            callbackURL: env.get<string>('KAKAO_REDIRECT_URI'),
        });
    }

    async validate(accessToken, refreshToken, profile, done) {
        const { id, _json } = profile;

        const userData: CallBackUserDataDto = {
            providerId: id,
            email: _json.kakao_account.email,
        };

        const user = await this.userService.findOneByProviderId(
            userData.providerId,
        );

        if (!user) {
            const newUser = await this.userService.create(userData);
            return done(null, newUser);
        }
        done(null, user);
    }
}
