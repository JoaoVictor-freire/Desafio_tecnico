import { Controller, Get, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Buscar dados do treinador por ID' })
    @ApiResponse({ status: 200, description: 'Dados do treinador (sem senha)' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
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
    @ApiOperation({ summary: 'Atualizar perfil do treinador' })
    @ApiResponse({ status: 200, description: 'Treinador atualizado (sem senha)' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    @ApiResponse({ status: 404, description: 'Treinador não encontrado' })
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
    @ApiOperation({ summary: 'Deletar conta do treinador' })
    @ApiResponse({ status: 204, description: 'Treinador deletado com sucesso' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
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
