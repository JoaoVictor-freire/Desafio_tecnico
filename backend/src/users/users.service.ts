import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existing = await this.userRepository.findOne({ where: { Email: createUserDto.Email } });
        if (existing) {
            throw new ConflictException('Email já cadastrado');
        }
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
}
