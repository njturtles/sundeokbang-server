import { Expose, Transform } from 'class-transformer';

export class RoomResponseDto {
    @Expose()
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
    @Transform(({ obj }) => (obj.imageUrl ? obj.imageUrl : null))
    imageUrl: string | null;
}