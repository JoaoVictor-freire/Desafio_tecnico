import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPokemonDto: CreatePokemonDto, @Request() req) {
        createPokemonDto.IdUser = req.user.IdUser;
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return this.pokemonService.findAll();
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    async findAllByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req) {
        if (req.user.IdUser !== userId) {
            throw new ForbiddenException('Você só pode ver seus próprios pokémons');
        }
        return this.pokemonService.findAllByUser(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pokemonService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
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
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const pokemon = await this.pokemonService.findOne(id);
        if (pokemon.IdUser !== req.user.IdUser) {
            throw new ForbiddenException('Este pokémon não pertence a você');
        }
        await this.pokemonService.remove(id);
    }
}
