import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) {}

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const pokemon = this.pokemonRepository.create(createPokemonDto);
        return this.pokemonRepository.save(pokemon);
    }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonRepository
            .createQueryBuilder('p')
            .leftJoin('p.user', 'u')
            .addSelect(['u.Name'])
            .orderBy('p.IdPokemon', 'DESC')
            .getMany();
    }

    async findAllByUser(userId: number): Promise<Pokemon[]> {
        return this.pokemonRepository.find({ where: { IdUser: userId } });
    }

    async findOne(id: number): Promise<Pokemon> {
        const pokemon = await this.pokemonRepository.findOne({ where: { IdPokemon: id } });
        if (!pokemon) {
            throw new NotFoundException('Pokémon não encontrado');
        }
        return pokemon;
    }

    async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        const pokemon = await this.findOne(id);
        Object.assign(pokemon, updatePokemonDto);
        return this.pokemonRepository.save(pokemon);
    }

    async remove(id: number): Promise<void> {
        const pokemon = await this.findOne(id);
        await this.pokemonRepository.remove(pokemon);
    }
}
