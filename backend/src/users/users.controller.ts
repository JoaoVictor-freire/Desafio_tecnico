import { Controller, Get, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ) {
        if (req.user.IdUser !== id) {
            throw new ForbiddenException('Acesso negado');
        }
        const user = await this.usersService.findById(id);
        const { Password, ...result } = user;
        return result;
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Request() req,
    ) {
        if (req.user.IdUser !== id) {
            throw new ForbiddenException('Você só pode atualizar seu próprio perfil');
        }
        const user = await this.usersService.update(id, updateUserDto);
        const { Password, ...result } = user;
        return result;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ) {
        if (req.user.IdUser !== id) {
            throw new ForbiddenException('Você só pode deletar seu próprio perfil');
        }
        await this.usersService.remove(id);
    }
}
