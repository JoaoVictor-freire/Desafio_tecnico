import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePokemonDto {
    @IsOptional()
    @IsString()
    Name?: string;

    @IsOptional()
    @IsString()
    Type?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    Level?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    Health?: number;
}
