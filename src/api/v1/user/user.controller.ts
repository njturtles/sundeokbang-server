import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User as UserEntity } from '../../../entities/user.entity';
import { User } from '../../../libs/decorators/user.decorator';
import { UserService } from './user.service';

@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete()
    @UseGuards(JwtAuthGuard)
    async deleteRoom(@User() user: UserEntity) {
        await this.userService.delete(user);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@User() user: UserEntity): Promise<String> {
        const profile = await this.userService.getProfile(user);
        return profile.name;
    }
}
