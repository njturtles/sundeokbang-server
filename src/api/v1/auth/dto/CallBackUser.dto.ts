import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CallBackUserDataDto {
    @IsString()
    @IsNotEmpty()
    providerId: string;

    @IsEmail()
    email: string;
}
