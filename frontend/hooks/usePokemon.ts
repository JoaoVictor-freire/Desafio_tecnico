'use client';

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Pokemon, CreatePokemonPayload, UpdatePokemonPayload } from '../types/pokemon';

export function usePokemon(userId: number, filter: 'all' | 'mine') {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        load();
    }, [filter]);

    async function load() {
        try {
            setLoading(true);
            setError('');
            const data = filter === 'mine'
                ? await api.pokemon.findAllByUser(userId)
                : await api.pokemon.findAll();
            setPokemons(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function create(payload: CreatePokemonPayload) {
        await api.pokemon.create(payload);
        await load();
    }

    async function update(id: number, payload: UpdatePokemonPayload) {
        await api.pokemon.update(id, payload);
        await load();
    }

    async function remove(id: number) {
        await api.pokemon.remove(id);
        await load();
    }

    return { pokemons, loading, error, create, update, remove };
}
