import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindRoomsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    minDeposit?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxDeposit?: number = 7000000;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    minCost?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxCost?: number = 10000000;
}
