import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Pokemon')
@ApiBearerAuth('access-token')
@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Capturar (criar) um novo pokémon' })
    @ApiResponse({ status: 201, description: 'Pokémon capturado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Não autorizado' })
    async create(@Body() createPokemonDto: CreatePokemonDto, @Request() req) {
        createPokemonDto.IdUser = req.user.IdUser;
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Listar todos os pokémons (todos os treinadores)' })
    @ApiResponse({ status: 200, description: 'Lista de pokémons com nome do treinador' })
    async findAll() {
        return this.pokemonService.findAll();
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Listar pokémons de um treinador específico' })
    @ApiResponse({ status: 200, description: 'Lista de pokémons do treinador' })
    @ApiResponse({ status: 403, description: 'Acesso negado' })
    async findAllByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req) {
        if (req.user.IdUser !== userId) {
            throw new ForbiddenException('Você só pode ver seus próprios pokémons');
        }
        return this.pokemonService.findAllByUser(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Buscar um pokémon por ID' })
    @ApiResponse({ status: 200, description: 'Dados do pokémon' })
    @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pokemonService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Atualizar dados de um pokémon' })
    @ApiResponse({ status: 200, description: 'Pokémon atualizado' })
    @ApiResponse({ status: 403, description: 'Pokémon não pertence ao treinador' })
    @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePokemonDto: UpdatePokemonDto,
        @Request() req,
    ) {
        const pokemon = await this.pokemonService.findOne(id);
        if (pokemon.IdUser !== req.user.IdUser) {
            throw new ForbiddenException('Este pokémon não pertence a você');
        }
        return this.pokemonService.update(id, updatePokemonDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar um pokémon' })
    @ApiResponse({ status: 204, description: 'Pokémon deletado' })
    @ApiResponse({ status: 403, description: 'Pokémon não pertence ao treinador' })
    @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const pokemon = await this.pokemonService.findOne(id);
        if (pokemon.IdUser !== req.user.IdUser) {
            throw new ForbiddenException('Este pokémon não pertence a você');
        }
        await this.pokemonService.remove(id);
    }
}
