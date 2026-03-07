export interface Pokemon {
    IdPokemon: number;
    IdUser: number;
    Name: string;
    Type: string;
    Level: number;
    Health: number;
}

export interface CreatePokemonPayload {
    Name: string;
    Type: string;
    Level: number;
    Health: number;
}

export interface UpdatePokemonPayload {
    Name?: string;
    Type?: string;
    Level?: number;
    Health?: number;
}
