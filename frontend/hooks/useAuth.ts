import { AuthUser, AuthTokenResponse } from '../types/auth';

export function useAuth() {
    function isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('token');
    }

    function getUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;
        const token = localStorage.getItem('token');
        if (!token) return null;
        return {
            userId: Number(localStorage.getItem('userId')),
            userEmail: localStorage.getItem('userEmail') || '',
            userName: localStorage.getItem('userName') || 'TRAINER',
            userAvatar: localStorage.getItem('userAvatar') || '1',
        };
    }

    function saveSession(data: AuthTokenResponse): void {
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userId', String(payload.sub));
        localStorage.setItem('userEmail', payload.email);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userAvatar', data.avatar);
    }

    function updateLocalProfile(name: string, avatar: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('userName', name);
        localStorage.setItem('userAvatar', avatar);
    }

    async function logout(): Promise<void> {
        try {
            if (typeof window !== 'undefined' && localStorage.getItem('token')) {
                const { api } = await import('../services/api');
                await api.auth.logout();
            }
        } catch {
            // ignore — token may already be invalid
        } finally {
            if (typeof window !== 'undefined') localStorage.clear();
        }
    }

    return { isAuthenticated, getUser, saveSession, updateLocalProfile, logout };
}
