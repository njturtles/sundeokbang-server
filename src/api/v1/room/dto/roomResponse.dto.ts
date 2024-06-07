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

    constructor(
        id: number,
        latitude: number,
        longitude: number,
        name: string,
        address: string,
        deposit: number,
        cost: number,
        isFavorite: boolean,
        imageUrl: string | null,
    ) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.address = address;
        this.deposit = deposit;
        this.cost = cost;
        this.isFavorite = isFavorite;
        this.imageUrl = imageUrl;
    }
}
