import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsEmail({}, { message: 'Email inválido' })
    Email: string;

    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    Password: string;
}
