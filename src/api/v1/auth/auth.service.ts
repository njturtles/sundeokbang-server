import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';
import { User } from '../../../libs/entity/user/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly env: ConfigService,
    ) {}

    createPayload(user: User): Payload {
        return {
            providerId: user?.providerId,
            userName: user?.name,
            university: user?.university?.name,
            latitude: user?.university?.latitude,
            longtitude: user?.university?.longtitude,
        };
    }

    signToken(payload: Payload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.env.get<string>('JWT_EXPIRES_IN'),
        });
    }

    getCookie(name: string, value: string, options: Record<string, any> = {}) {
        return {
            [name]: { value, options },
        };
    }
}
