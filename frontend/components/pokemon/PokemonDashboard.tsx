'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePokemon } from '../../hooks/usePokemon';
import { Header } from '../layout/Header';
import { PokemonList } from './PokemonList';
import { PokemonForm } from './PokemonForm';
import { Pokemon, CreatePokemonPayload } from '../../types/pokemon';
import { colors, px } from '../../lib/pixelStyle';

interface PokemonDashboardProps {
    userId: number;
    userEmail: string;
}

export function PokemonDashboard({ userId, userEmail }: PokemonDashboardProps) {
    const { pokemons, loading, error, create, update, remove } = usePokemon(userId);
    const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);

    function handleEdit(pokemon: Pokemon) {
        setEditingPokemon(pokemon);
    }

    function handleCancelForm() {
        setEditingPokemon(null);
    }

    async function handleFormSubmit(data: CreatePokemonPayload) {
        if (editingPokemon) {
            await update(editingPokemon.IdPokemon, data);
        } else {
            await create(data);
        }
        handleCancelForm();
    }

    async function handleDelete(id: number) {
        if (!confirm('Tem certeza que deseja liberar este Pokémon?')) return;
        await remove(id);
    }

    return (
        <div className="min-h-screen" style={{ background: colors.bg, ...px.font }}>
            <Header userEmail={userEmail} />
            <main className="max-w-5xl mx-auto px-4 py-8">
                {error && (
                    <div style={{ ...px.badge, background: '#ffc8a0', color: colors.error, padding: '10px', width: '100%', textAlign: 'center', marginBottom: '16px', fontSize: '7px' }}>
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '12px', color: colors.dark }}>MEUS POKÉMONS</p>
                    <Link href="/capture" style={{ ...px.btn, ...px.btnPrimary, fontSize: '7px', textDecoration: 'none' }}>
                        + CAPTURAR POKÉMON
                    </Link>
                </div>

                {editingPokemon && (
                    <PokemonForm
                        initial={editingPokemon}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                    />
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ fontSize: '9px', color: colors.muted }}>CARREGANDO...</p>
                    </div>
                ) : (
                    <PokemonList
                        pokemons={pokemons}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
}
