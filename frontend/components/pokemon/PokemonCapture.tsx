'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { colors, px, getTypeStyle, FR_SPRITE } from '../../lib/pixelStyle';
import { api } from '../../services/api';
import { Header } from '../layout/Header';

interface WildPokemon {
    id: number;
    name: string;
    type: string;
    level: number;
    health: number;
    sprite: string;
}

interface PokemonCaptureProps {
    userId: number;
    userEmail: string;
}

// Gen-I only (1–151) — FireRed pokédex
const GEN1_COUNT = 151;
const PAGE_SIZE = 12;

export function PokemonCapture({ userId, userEmail }: PokemonCaptureProps) {
    const router = useRouter();
    const [wildPokemon, setWildPokemon] = useState<WildPokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [capturing, setCapturing] = useState<number | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRandomBatch();
    }, []);

    async function loadRandomBatch() {
        setLoading(true);
        setError('');
        try {
            // Pick PAGE_SIZE random Gen-I ids
            const ids = new Set<number>();
            while (ids.size < PAGE_SIZE) {
                ids.add(Math.floor(Math.random() * GEN1_COUNT) + 1);
            }

            const results = await Promise.all(
                Array.from(ids).map(async (id) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await res.json();
                    const types = data.types.map((t: any) => t.type.name).join('/');
                    const hp = data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 50;
                    // Random level between 1–100
                    const level = Math.floor(Math.random() * 100) + 1;
                    return {
                        id: data.id,
                        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                        type: types.charAt(0).toUpperCase() + types.slice(1),
                        level,
                        health: hp,
                        sprite: FR_SPRITE(data.id),
                    } as WildPokemon;
                })
            );
            setWildPokemon(results);
        } catch {
            setError('ERRO AO BUSCAR POKÉMONS SELVAGENS');
        } finally {
            setLoading(false);
        }
    }

    async function handleCapture(pokemon: WildPokemon) {
        setCapturing(pokemon.id);
        setError('');
        try {
            await api.pokemon.create({
                Name: pokemon.name,
                Type: pokemon.type,
                Level: pokemon.level,
                Health: pokemon.health,
            });
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'ERRO AO CAPTURAR');
            setCapturing(null);
        }
    }

    return (
        <div className="min-h-screen" style={{ background: colors.bg, ...px.font }}>
            <Header userEmail={userEmail} />

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '12px', color: colors.dark }}>POKÉMONS SELVAGENS</p>
                    <button
                        onClick={loadRandomBatch}
                        style={{ ...px.btn, ...px.btnSecondary, fontSize: '7px' }}
                        disabled={loading}
                    >
                        {loading ? 'BUSCANDO...' : '↻ NOVA BUSCA'}
                    </button>
                </div>

                {error && (
                    <div style={{ ...px.badge, background: '#ffc8a0', color: colors.error, padding: '10px', width: '100%', textAlign: 'center', marginBottom: '16px', fontSize: '7px' }}>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ fontSize: '9px', color: colors.muted }}>PROCURANDO POKÉMONS NA GRAMA ALTA...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {wildPokemon.map((poke) => {
                            const ts = getTypeStyle(poke.type);
                            const isCap = capturing === poke.id;
                            return (
                                <div
                                    key={poke.id}
                                    className="flex flex-col overflow-hidden"
                                    style={{ ...px.card, background: ts.bg }}
                                >
                                    {/* Sprite area */}
                                    <div className="flex items-center justify-center" style={{ padding: '16px', minHeight: '100px' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={poke.sprite}
                                            alt={poke.name}
                                            style={{ ...px.sprite, width: '64px', height: '64px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <p style={{ fontSize: '10px', color: colors.dark }}>{poke.name.toUpperCase()}</p>

                                        <div className="flex gap-2 flex-wrap">
                                            <span style={{ ...px.badge, color: ts.accent }}>{poke.type.toUpperCase()}</span>
                                        </div>

                                        <div className="flex justify-between" style={{ fontSize: '7px', color: ts.accent }}>
                                            <span>LVL {poke.level}</span>
                                            <span>HP {poke.health}</span>
                                        </div>

                                        {/* HP bar */}
                                        <div style={{ background: 'rgba(0,0,0,0.15)', height: '6px', border: '1px solid #000' }}>
                                            <div style={{ background: colors.green, height: '100%', width: `${Math.min(poke.health, 100)}%` }} />
                                        </div>

                                        <button
                                            onClick={() => handleCapture(poke)}
                                            disabled={isCap}
                                            style={{
                                                ...px.btn,
                                                ...px.btnPrimary,
                                                width: '100%',
                                                fontSize: '7px',
                                                padding: '8px',
                                                marginTop: '4px',
                                                opacity: isCap ? 0.6 : 1,
                                            }}
                                        >
                                            {isCap ? 'CAPTURANDO...' : '⊕ CAPTURAR'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button
                        onClick={() => router.push('/dashboard')}
                        style={{ ...px.btn, ...px.btnSecondary, fontSize: '7px' }}
                    >
                        ← VOLTAR AO DASHBOARD
                    </button>
                </div>
            </main>
        </div>
    );
}
