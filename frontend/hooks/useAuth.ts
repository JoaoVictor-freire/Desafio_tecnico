import { AuthUser } from '../types/auth';

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
        };
    }

    function saveSession(token: string): void {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('token', token);
        localStorage.setItem('userId', String(payload.sub));
        localStorage.setItem('userEmail', payload.email);
    }

    function logout(): void {
        localStorage.clear();
    }

    return { isAuthenticated, getUser, saveSession, logout };
}
