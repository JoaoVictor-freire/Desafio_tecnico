import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePokemonDto {
    @ApiPropertyOptional({ example: 'Raichu', description: 'Novo nome do pokémon' })
    @IsOptional()
    @IsString()
    Name?: string;

    @ApiPropertyOptional({ example: 'Electric', description: 'Novo tipo do pokémon' })
    @IsOptional()
    @IsString()
    Type?: string;

    @ApiPropertyOptional({ example: 36, description: 'Novo nível (1–100)', minimum: 1, maximum: 100 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    Level?: number;

    @ApiPropertyOptional({ example: 60, description: 'Novo HP (mín. 1)', minimum: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    Health?: number;

    @ApiPropertyOptional({ example: 26, description: 'Novo ID na Pokédex (1–151)', minimum: 1, maximum: 151 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(151)
    PokedexId?: number;
}
