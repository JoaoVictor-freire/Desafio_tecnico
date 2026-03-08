import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'Misty', description: 'Novo nome do treinador' })
    @IsOptional()
    @IsString()
    Name?: string;

    @ApiPropertyOptional({ example: 'NovaS3nh@!', description: 'Nova senha (mín. 8 chars, 1 maiúscula, 1 número, 1 especial)' })
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    Password?: string;

    @ApiPropertyOptional({ example: '3', description: 'ID do avatar do treinador' })
    @IsOptional()
    @IsString()
    Avatar?: string;
}
