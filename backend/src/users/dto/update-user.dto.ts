import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    Name?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    Password?: string;

    @IsOptional()
    @IsString()
    Avatar?: string;
}
