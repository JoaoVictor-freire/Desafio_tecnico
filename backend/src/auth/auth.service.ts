import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await this.hashPassword(createUserDto.Password);
        const user = await this.usersService.create({
            ...createUserDto,
            Password: hashedPassword,
        });
        const { Password, ...result } = user;
        return result;
    }

    async hashPassword(password: string) : Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password,salt);
    }

    async validateUser(email: string, password: string, userFromDb: any) {
        const isMatch = await bcrypt.compare(password, userFromDb.password);

        if (userFromDb && isMatch) {
            const { password, ...result } = userFromDb;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
