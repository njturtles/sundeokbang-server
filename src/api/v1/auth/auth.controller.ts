import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../../../libs/decorators/user.decorator';
import { User as UserEntity } from '../../../entities/user.entity';
import { ProfileUserDto } from './dto/ProfileUser.dto';

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
        const payload = this.authService.createPayload(user);

        return this.authService.signToken(payload);
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    async postMoreUserInfo(
        @User() user: UserEntity,
        @Body() profileDto: ProfileUserDto,
    ) {
        const updateUser = await this.userService.updateUserInfo(
            user._id,
            profileDto,
        );

        const payload = this.authService.createPayload(updateUser);

        return this.authService.signToken(payload);
    }
}
