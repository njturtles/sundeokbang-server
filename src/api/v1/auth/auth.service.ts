import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';
import { User } from '../../../entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly env: ConfigService,
    ) {}

    createPayload(user: User): Payload {
        return {
            userId: user?._id,
            userName: user?.name,
            university: user?.university?.name,
            latitude: user?.university?.latitude,
            longitude: user?.university?.longitude,
        };
    }

    signToken(payload: Payload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.env.get<string>('JWT_EXPIRES_IN'),
        });
    }

    getCookie(name: string, value: string, options: Record<string, any> = {}) {
        return {
            [name]: {
                value,
                options: {
                    ...options,
                    httpOnly: true,
                    domain: this.env.get<string>('COOKIE_DOMAIN'),
                },
            },
        };
    }
}
