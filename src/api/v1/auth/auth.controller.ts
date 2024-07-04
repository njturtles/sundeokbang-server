import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/jwt.payload';
import { AuthService } from './auth.service';
import { User } from '../../../libs/decorators/user.decorator';
import { User as UserEntity } from '../../../entities/user.entity';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get('oauth/kakao')
    @UseGuards(AuthGuard('kakao'))
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async kakaoLogin() {}

    @Get('oauth/kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    async kakaoLoginCallBack(@User() user: UserEntity) {
        const payload: Payload = this.authService.createPayload(user);

        const accessToken = this.authService.signToken(payload);

        return {
            cookies: this.authService.getCookie('user', accessToken),
        };
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    async postMoreUserInfo(@User() user: Payload, @Body() body) {
        const { userName, university } = body;

        const updateUser = await this.userService.updateUserInfo(
            user.userId,
            university,
            userName,
        );

        const payload: Payload = this.authService.createPayload(updateUser);

        const accessToken = this.authService.signToken(payload);

        return {
            cookies: this.authService.getCookie('user', accessToken),
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout() {
        return {
            cookies: this.authService.getCookie('user', ''),
        };
    }
}
