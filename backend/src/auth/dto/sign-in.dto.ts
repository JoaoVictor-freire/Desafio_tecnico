import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsEmail({}, { message: 'Email inválido' })
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    Password: string;
}
