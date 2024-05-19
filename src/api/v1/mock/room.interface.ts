export interface Room {
    _id: number;
    name: string;
    address: string;
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
    latitude: number;
    longitude: number;
    imageurl: string[];
    school: number;
    createdAt: Date;
    updatedAt: Date;
  }