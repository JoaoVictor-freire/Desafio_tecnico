import { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { colors, px } from '../../lib/pixelStyle';

interface PokemonListProps {
    pokemons: Pokemon[];
    onEdit: (pokemon: Pokemon) => void;
    onDelete: (id: number) => void;
}

export function PokemonList({ pokemons, onEdit, onDelete }: PokemonListProps) {
    if (pokemons.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontSize: '9px', color: colors.muted }}>NENHUM POKÉMON CAPTURADO AINDA.</p>
                <p style={{ fontSize: '7px', color: colors.muted, marginTop: '8px' }}>
                    CLIQUE EM &quot;CAPTURAR POKÉMON&quot; PARA COMEÇAR!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.IdPokemon}
                    pokemon={pokemon}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
