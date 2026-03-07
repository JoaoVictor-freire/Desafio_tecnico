import { RegisterPayload, LoginPayload, AuthTokenResponse } from '../types/auth';
import { Pokemon, CreatePokemonPayload, UpdatePokemonPayload } from '../types/pokemon';

const API_URL = 'http://localhost:3002';

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    if (res.status === 204) return null as T;

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Erro na requisição');
    }

    return data as T;
}

export const api = {
    auth: {
        register: (body: RegisterPayload) =>
            request<{ message: string; user: Omit<RegisterPayload, 'Password'> }>(
                '/auth/register',
                { method: 'POST', body: JSON.stringify(body) },
            ),
        login: (body: LoginPayload) =>
            request<AuthTokenResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
        logout: () =>
            request<{ message: string }>('/auth/logout', { method: 'POST' }),
    },
    users: {
        update: (id: number, body: Partial<RegisterPayload>) =>
            request(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
        remove: (id: number) =>
            request(`/users/${id}`, { method: 'DELETE' }),
    },
    pokemon: {
        create: (body: CreatePokemonPayload) =>
            request<Pokemon>('/pokemon', { method: 'POST', body: JSON.stringify(body) }),
        findAllByUser: (userId: number) =>
            request<Pokemon[]>(`/pokemon/user/${userId}`),
        findOne: (id: number) =>
            request<Pokemon>(`/pokemon/${id}`),
        update: (id: number, body: UpdatePokemonPayload) =>
            request<Pokemon>(`/pokemon/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
        remove: (id: number) =>
            request<null>(`/pokemon/${id}`, { method: 'DELETE' }),
    },
};
