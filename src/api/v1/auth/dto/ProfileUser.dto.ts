import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileUserDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    university: string;
}
