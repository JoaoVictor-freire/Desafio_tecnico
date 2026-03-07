import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { Email: email } });
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { IdUser: id } });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        if (updateUserDto.Email && updateUserDto.Email !== user.Email) {
            const existing = await this.userRepository.findOne({ where: { Email: updateUserDto.Email } });
            if (existing) {
                throw new ConflictException('Email já cadastrado');
            }
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.userRepository.remove(user);
    }
}
