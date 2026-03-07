import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() signUpDto: RegisterDto) {
        const user = await this.authService.register(signUpDto);
        return { message: 'Treinador registrado com sucesso!', user };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() signInDto: SignInDto) {
        return this.authService.login(signInDto.Email, signInDto.Password);
    }
}
