import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Ash Ketchum', description: 'Nome do treinador' })
    @IsString()
    @IsNotEmpty()
    Name: string;

    @ApiProperty({ example: 'ash@pallet.com', description: 'E-mail do treinador' })
    @IsEmail({}, { message: 'Email inválido' })
    Email: string;

    @ApiProperty({ example: 'Pikachu1@', description: 'Senha (mín. 8 chars, 1 maiúscula, 1 número, 1 especial)' })
    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    Password: string;
}
