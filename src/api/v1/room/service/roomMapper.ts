import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Room } from '../../../../libs/entity/room/room.entity';
import { RoomResponseDto } from '../dto/RoomResponse.dto';
import { Favorite } from 'src/libs/entity/favorite/favorite.entity';

export class RoomMapper {
    static toResponseDto(room: Room, favorites: Favorite[]): RoomResponseDto {
        const isFavorite = favorites.some(
            (fav) => fav.room._id === room._id,
        );

        const plainRoom = instanceToPlain(room);
        plainRoom.isFavorite = isFavorite;
        plainRoom.imageUrl =
            room.files.length > 0 ? room.files[0].url : null;

        return plainToInstance(RoomResponseDto, plainRoom, {
            excludeExtraneousValues: true,
        });
    }
}
