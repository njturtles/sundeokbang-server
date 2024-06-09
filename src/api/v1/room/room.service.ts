import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { Repository } from 'typeorm';
import { RoomResponseDto } from './dto/RoomResponse.dto';
import { RoomDetailDto } from './dto/RoomDetail.dto';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        private roomRepository: RoomRepository,
    ) {}

    async findRoomsByUniversityName(
        university_name: string,
        providerId: string,
        deposit?: string,
        cost?: string,
    ): Promise<RoomResponseDto[]> {
        const depositRange = deposit
            ? (deposit.split(',').map(Number) as [number, number])
            : undefined;
        const costRange = cost
            ? (cost.split(',').map(Number) as [number, number])
            : undefined;

        const rooms = await this.roomRepository.findByUniversityNameAndFilters(
            university_name,
            depositRange,
            costRange,
            providerId,
        );

        return rooms;
    }

    async findRoomById(id: number, userId: string): Promise<RoomDetailDto> {
        const room = await this.roomRepository.findOne({
            where: { _id: id },
            relations: ['files'],
        });

        if (!room) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        const isFavorited = await this.roomRepository.isRoomFavoritedByUser(
            id,
            userId,
        );

        return new RoomDetailDto(room, isFavorited);
    }
}
