export interface Pokemon {
    IdPokemon: number;
    IdUser: number;
    Name: string;
    Type: string;
    Level: number;
    Health: number;
    PokedexId?: number;
    user?: { Name: string };
}

export interface CreatePokemonPayload {
    Name: string;
    Type: string;
    Level: number;
    Health: number;
    PokedexId?: number;
}

export interface UpdatePokemonPayload {
    Name?: string;
    Type?: string;
    Level?: number;
    Health?: number;
}
