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
    userName: string;
    userAvatar: string;
}

const FILTER_KEY = 'pokemon_dashboard_filter';

export function PokemonDashboard({ userId, userName, userAvatar }: PokemonDashboardProps) {
    const [filter, setFilter] = useState<'all' | 'mine'>(() => {
        if (typeof window === 'undefined') return 'all';
        return (localStorage.getItem(FILTER_KEY) as 'all' | 'mine') ?? 'all';
    });
    const { pokemons, loading, error, create, update, remove } = usePokemon(userId, filter);

    const [trainerSearch, setTrainerSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    function handleFilterChange(value: 'all' | 'mine') {
        localStorage.setItem(FILTER_KEY, value);
        setFilter(value);
        if (value === 'mine') {
            setTrainerSearch('');
            setSearchOpen(false);
        }
    }

    const visiblePokemons = filter === 'all' && trainerSearch.trim()
        ? pokemons.filter(p =>
            (p.user?.Name ?? '').toLowerCase().includes(trainerSearch.trim().toLowerCase())
          )
        : pokemons;
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
            <Header userName={userName} userAvatar={userAvatar} />
            <main className="max-w-5xl mx-auto px-4 py-8">
                {error && (
                    <div style={{ ...px.badge, background: '#ffc8a0', color: colors.error, padding: '10px', width: '100%', textAlign: 'center', marginBottom: '16px', fontSize: '7px' }}>
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center" style={{ marginBottom: '20px', gap: '12px' }}>
                    <div className="flex items-center" style={{ gap: '10px', flex: 1 }}>
                        {editingPokemon ? (
                            <p style={{ fontSize: '12px', color: colors.dark }}>EDITANDO POKÉMON</p>
                        ) : (
                            <select
                                value={filter}
                                onChange={e => handleFilterChange(e.target.value as 'all' | 'mine')}
                                style={{
                                    fontFamily: "var(--font-pixel, 'Courier New', monospace)",
                                    fontSize: '11px',
                                    color: colors.dark,
                                    background: colors.bg,
                                    border: 'none',
                                    borderBottom: `3px solid ${colors.dark}`,
                                    padding: '2px 4px 4px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                }}
                            >
                                <option value="all">TODOS OS POKÉMONS ▾</option>
                                <option value="mine">MEUS POKÉMONS ▾</option>
                            </select>
                        )}

                        {!editingPokemon && filter === 'all' && (
                            <div className="flex items-center" style={{ gap: '6px' }}>
                                <button
                                    onClick={() => { setSearchOpen(o => !o); setTrainerSearch(''); }}
                                    title="Filtrar por treinador"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '2px',
                                        lineHeight: 1,
                                        opacity: searchOpen ? 1 : 0.5,
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', imageRendering: 'pixelated' }}>
                                        <rect x="2" y="2" width="2" height="2" fill={colors.dark}/>
                                        <rect x="4" y="1" width="4" height="1" fill={colors.dark}/>
                                        <rect x="8" y="2" width="2" height="2" fill={colors.dark}/>
                                        <rect x="1" y="4" width="1" height="4" fill={colors.dark}/>
                                        <rect x="10" y="4" width="1" height="4" fill={colors.dark}/>
                                        <rect x="2" y="8" width="2" height="2" fill={colors.dark}/>
                                        <rect x="4" y="10" width="2" height="1" fill={colors.dark}/>
                                        <rect x="6" y="10" width="2" height="1" fill={colors.dark}/>
                                        <rect x="8" y="8" width="2" height="2" fill={colors.dark}/>
                                        <rect x="9" y="10" width="2" height="2" fill={colors.dark}/>
                                        <rect x="11" y="12" width="2" height="2" fill={colors.dark}/>
                                        <rect x="13" y="13" width="2" height="2" fill={colors.dark}/>
                                    </svg>
                                </button>
                                {searchOpen && (
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="TREINADOR..."
                                        value={trainerSearch}
                                        onChange={e => setTrainerSearch(e.target.value)}
                                        style={{
                                            ...px.input,
                                            width: '160px',
                                            fontSize: '8px',
                                            padding: '4px 8px',
                                            border: `2px solid ${colors.dark}`,
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {!editingPokemon && (
                        <Link href="/capture" style={{ ...px.btn, ...px.btnPrimary, fontSize: '7px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                            + CAPTURAR POKÉMON
                        </Link>
                    )}
                </div>

                {editingPokemon ? (
                    <PokemonForm
                        initial={editingPokemon}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                    />
                ) : loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ fontSize: '9px', color: colors.muted }}>CARREGANDO...</p>
                    </div>
                ) : (
                    <PokemonList
                        pokemons={visiblePokemons}
                        currentUserId={userId}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
}
