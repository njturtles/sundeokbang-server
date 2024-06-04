import { Expose, Transform } from 'class-transformer';

export class RoomResponseDto {
    @Expose()
    @Transform(({ obj }) => obj._id)
    id: number;

    @Expose()
    latitude: number;

    @Expose()
    longitude: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    deposit: number;

    @Expose()
    cost: number;

    @Expose()
    isFavorite: boolean;

    @Expose()
    @Transform(({ obj }) => (obj.files.length > 0 ? obj.files[0].url : null))
    imageUrl: string | null;
}
