'use client';

import { useState, useEffect } from 'react';
import { Pokemon, CreatePokemonPayload } from '../../types/pokemon';
import { colors, px } from '../../lib/pixelStyle';

interface PokemonFormProps {
    initial?: Pokemon;
    onSubmit: (data: CreatePokemonPayload) => Promise<void>;
    onCancel: () => void;
}

export function PokemonForm({ initial, onSubmit, onCancel }: PokemonFormProps) {
    const [name, setName] = useState(initial?.Name || '');
    const [type, setType] = useState(initial?.Type || '');
    const [level, setLevel] = useState(String(initial?.Level || ''));
    const [health, setHealth] = useState(String(initial?.Health || ''));

    useEffect(() => {
        if (initial) {
            setName(initial.Name);
            setType(initial.Type);
            setLevel(String(initial.Level));
            setHealth(String(initial.Health));
        }
    }, [initial]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit({ Name: name, Type: type, Level: Number(level), Health: Number(health) });
    }

    return (
        <div style={{ ...px.card, background: colors.card, padding: '20px', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', color: colors.dark, marginBottom: '14px' }}>
                {initial ? 'EDITAR POKÉMON' : 'NOVO POKÉMON'}
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                    <label style={px.label}>NOME</label>
                    <input style={px.input} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label style={px.label}>TIPO</label>
                    <input style={px.input} value={type} onChange={(e) => setType(e.target.value)} required placeholder="Fire, Water..." />
                </div>
                <div>
                    <label style={px.label}>LEVEL</label>
                    <input style={px.input} type="number" value={level} onChange={(e) => setLevel(e.target.value)} required min="1" max="100" />
                </div>
                <div>
                    <label style={px.label}>HEALTH</label>
                    <input style={px.input} type="number" value={health} onChange={(e) => setHealth(e.target.value)} required min="1" />
                </div>
                <div className="col-span-2 flex gap-2">
                    <button type="submit" style={{ ...px.btn, ...px.btnPrimary }}>
                        {initial ? 'SALVAR' : 'CAPTURAR'}
                    </button>
                    <button type="button" onClick={onCancel} style={{ ...px.btn, ...px.btnSecondary }}>
                        CANCELAR
                    </button>
                </div>
            </form>
        </div>
    );
}
