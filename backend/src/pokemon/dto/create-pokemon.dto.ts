import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePokemonDto {
    @ApiPropertyOptional({ description: 'ID do treinador (preenchido automaticamente pelo JWT)' })
    @IsOptional()
    @IsInt()
    IdUser: number;

    @ApiProperty({ example: 'Pikachu', description: 'Nome do pokémon' })
    @IsString()
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    Name: string;

    @ApiProperty({ example: 'Electric', description: 'Tipo do pokémon' })
    @IsString()
    @IsNotEmpty({ message: 'Tipo é obrigatório' })
    Type: string;

    @ApiProperty({ example: 25, description: 'Nível do pokémon (1–100)', minimum: 1, maximum: 100 })
    @IsInt()
    @Min(1)
    @Max(100)
    Level: number;

    @ApiProperty({ example: 35, description: 'HP do pokémon (mín. 1)', minimum: 1 })
    @IsInt()
    @Min(1)
    Health: number;

    @ApiPropertyOptional({ example: 25, description: 'ID na Pokédex (1–151)', minimum: 1, maximum: 151 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(151)
    PokedexId: number;
}
