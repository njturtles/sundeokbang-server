import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../libs/entity/user/user.entity';
import { Repository } from 'typeorm';
import { University } from '../../../libs/entity/university/university.entity';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findOneByProviderId(providerId: string): Promise<User> {
        return this.userRepository.findOne({
            where: { providerId },
            relations: ['university'],
        });
    }

    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async updateUserInfo(
        providerId: string,
        university: string,
        userName?: string,
    ) {
        const user = await this.findOneByProviderId(providerId);

        if (userName) {
            user.name = userName;
        }

        const universityInfo = await this.userRepository.manager
            .getRepository(University)
            .findOne({ where: { name: university } });

        if (!universityInfo) {
            throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
                message: 'Invalid university provided',
            });
        }

        user.university = universityInfo;

        return this.userRepository.save(user);
    }
}
