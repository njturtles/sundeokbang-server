import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateRoomDto {
    @IsString()
    name: string;

    @IsString()
    universityName: string;

    @IsString()
    address: string;

    @IsString()
    contractType: string;

    @Type(() => Number)
    @IsNumber()
    deposit: number;

    @Type(() => Number)
    @IsNumber()
    cost: number;

    @IsString()
    term: string;

    @Type(() => Number)
    @IsNumber()
    maintenanceCost: number;

    @IsOptional()
    @IsString()
    commonArea?: string;

    @IsString()
    type: string;

    @Type(() => Number)
    @IsNumber()
    exclusiveArea: number;

    @Type(() => Boolean)
    @IsBoolean()
    parking: boolean;

    @IsString()
    heatingSystem: string;

    @IsString()
    furniture: string;

    @IsString()
    appliances: string;

    @IsString()
    prevention: string;

    @IsOptional()
    @IsString()
    etc?: string;

    @IsOptional()
    @IsString()
    detail?: string;

    @IsString()
    phone: string;

    @IsString()
    owner: string;
}
