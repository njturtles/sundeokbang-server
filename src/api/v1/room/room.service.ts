import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';
import { Between, In, Repository } from 'typeorm';
import ApiError from '../../../libs/common-config/res/api.error';
import ApiCodes from '../../../libs/common-config/res/api.codes';
import ApiMessages from '../../../libs/common-config/res/api.messages';
import { File } from '../../../libs/entity/file/file.entity';
import { Room } from '../../../libs/entity/room/room.entity';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ) {}

    async findByUniversityName(
        universityName: string,
        providerId: string,
        minDeposit: number,
        maxDeposit: number,
        minCost: number,
        maxCost: number,
    ): Promise<{ count; rows }> {
        const [rooms, count] = await this.roomRepository.findAndCount({
            where: {
                university: { name: universityName },
                deposit: Between(minDeposit, maxDeposit),
                cost: Between(minCost, maxCost),
            },
            select: [
                '_id',
                'name',
                'address',
                'latitude',
                'longitude',
                'deposit',
                'cost',
            ],
        });

        const roomIds = rooms.map((room) => room._id);

        const favorites = await this.favoriteRepository.find({
            where: {
                room: { _id: In(roomIds) },
                user: { providerId: providerId },
            },
            relations: ['room'],
        });

        const images = await this.fileRepository.find({
            where: {
                room: { _id: In(roomIds) },
            },
            relations: ['room'],
            select: ['url', 'room'],
        });

        const roomList = rooms.map((room) => {
            const image = images.find((img) => img.room._id === room._id);
            return {
                ...room,
                isFavorited: favorites.some((fav) => fav.room._id === room._id),
                imageUrl: image ? image.url : null,
            };
        });

        if (!rooms) {
            throw new ApiError(ApiCodes.NOT_FOUND, ApiMessages.NOT_FOUND);
        }

        return { count, rows: roomList };
    }
}
