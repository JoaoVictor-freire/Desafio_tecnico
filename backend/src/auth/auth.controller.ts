import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() signUpDto: CreateUserDto) {
        const user = await this.authService.register(signUpDto);
        return { message: 'Treinador registrado com sucesso!', user };
    }
}
