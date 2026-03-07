import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePokemonDto {
    @IsOptional()
    @IsInt()
    IdUser: number;

    @IsString()
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    Name: string;

    @IsString()
    @IsNotEmpty({ message: 'Tipo é obrigatório' })
    Type: string;

    @IsInt()
    @Min(1)
    @Max(100)
    Level: number;

    @IsInt()
    @Min(1)
    Health: number;
}
