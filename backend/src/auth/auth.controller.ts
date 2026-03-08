import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Throttle({ default: { ttl: 60000, limit: 5 } })
    @ApiOperation({ summary: 'Registrar novo treinador' })
    @ApiResponse({ status: 201, description: 'Treinador registrado com sucesso' })
    @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 429, description: 'Muitas tentativas. Tente novamente em 1 minuto' })
    async register(@Body() signUpDto: RegisterDto) {
        const user = await this.authService.register(signUpDto);
        return { message: 'Treinador registrado com sucesso!', user };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Throttle({ default: { ttl: 60000, limit: 10 } }) 
    @ApiOperation({ summary: 'Autenticar treinador e obter JWT' })
    @ApiResponse({ status: 200, description: 'Login realizado. Retorna access_token, name e avatar' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @ApiResponse({ status: 429, description: 'Muitas tentativas. Tente novamente em 1 minuto' })
    async login(@Body() signInDto: SignInDto) {
        return this.authService.login(signInDto.Email, signInDto.Password);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @SkipThrottle()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Logout do treinador (invalida sessão no cliente)' })
    @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
    logout() {
        return { message: 'Logout realizado com sucesso!' };
    }
}
