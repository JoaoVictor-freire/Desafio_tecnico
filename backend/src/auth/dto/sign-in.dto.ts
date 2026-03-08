import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ example: 'ash@pallet.com', description: 'E-mail do treinador' })
    @IsEmail({}, { message: 'Email inválido' })
    Email: string;

    @ApiProperty({ example: 'Pikachu1@', description: 'Senha do treinador' })
    @IsString()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    Password: string;
}
