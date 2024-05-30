export interface Room {
    _id: number;
    name: string;
    address: string;
    university_name: string;
    latitude: number;
    longitude: number;
    contracttype: string;
    deposit: number;
    cost: number;
    term: string;
    maintenanceCost: number;
    commonArea: string;
    type: string;
    exclusiveArea: number;
    parking: boolean;
    heatingSystem: string;
    furniture: string;
    appliances: string;
    prevention: string;
    etc: string;
    detail: string;
    phone: string;
    owner: string;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}
