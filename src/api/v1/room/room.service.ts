import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from 'src/libs/common-config/res/api.messages';

@Injectable()
export class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async getRoomsByUserProviderId(
        providerId: string,
        depositMin?: number,
        depositMax?: number,
        costMin?: number,
        costMax?: number,
    ): Promise<RoomResponseDto[]> {
        const user = await this.roomRepository.findUserByProviderId(providerId);
        if (!user || !user.university) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        return this.roomRepository.findRoomsByUniversityIdAndFilters(
            user.university._id,
            user.providerId,
            depositMin,
            depositMax,
            costMin,
            costMax,
        );
    }
}
