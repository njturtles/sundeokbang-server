import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserService } from '../user/user.service';
import { Payload } from './jwt/jwt.payload';
import { AuthService } from './auth.service';
import { User } from '../../../libs/entity/user/user.entity';

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
    async kakaoLoginCallBack(@Req() req: Request) {
        const user = req.user as User;

        const payload: Payload = this.authService.createPayload(user);

        const accessToken = this.authService.signToken(payload);

        return {
            cookies: this.authService.getCookie('user', accessToken, {
                httpOnly: true,
            }),
        };
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    async postMoreUserInfo(@Req() req: Request, @Body() body) {
        const { userName, university } = body;
        const userPayload = req.user as Payload;

        const updateUser = await this.userService.updateUserInfo(
            userPayload.providerId,
            university,
            userName,
        );

        const payload: Payload = this.authService.createPayload(updateUser);

        const accessToken = this.authService.signToken(payload);

        return {
            cookies: this.authService.getCookie('user', accessToken, {
                httpOnly: true,
            }),
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout() {
        return {
            cookies: this.authService.getCookie('user', '', {
                httpOnly: true,
                expires: new Date(0),
            }),
        };
    }
}
