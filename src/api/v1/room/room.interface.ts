import { File } from '../../../entities/file.entity';

export interface RoomResponse {
    _id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    contractType: string;
    deposit: number;
    cost: number;
    term: string;
    maintenanceCost: number;
    commonArea?: string;
    type: string;
    exclusiveArea: number;
    parking: boolean;
    heatingSystem: string;
    furniture: string;
    appliances: string;
    prevention: string;
    etc?: string;
    detail?: string;
    phone: string;
    owner: string;
    files?: File[];
    favorited: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface RoomList {
    count: number;
    rows: RoomResponse[];
}
