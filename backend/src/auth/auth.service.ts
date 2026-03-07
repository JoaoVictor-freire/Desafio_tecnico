import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async register(registerDto: RegisterDto) {
        const hashedPassword = await this.hashPassword(registerDto.Password);
        const user = await this.usersService.create({
            ...registerDto,
            Password: hashedPassword,
        });
        const { Password, ...result } = user;
        return result;
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.Password || !password) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const payload = { email: user.Email, sub: user.IdUser };
        return {
            access_token: this.jwtService.sign(payload),
            name: user.Name,
            avatar: user.Avatar || '1',
        };
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

}
