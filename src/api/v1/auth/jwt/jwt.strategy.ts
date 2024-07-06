import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import ApiError from '../../../../libs/common-config/res/api.error';
import ApiCodes from '../../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../../libs/common-config/res/api.messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly env: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOneByProviderId(
            payload.providerId,
        );
        if (!user) {
            throw new ApiError(ApiCodes.UNAUTHORIZED, ApiMessages.UNAUTHORIZED);
        }
        return payload;
    }
}
