'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { colors, px } from '../../lib/pixelStyle';

export function LoginForm() {
    const router = useRouter();
    const { saveSession } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        try {
            const data = await api.auth.login({ Email: email, Password: password });
            saveSession(data.access_token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: colors.bg, ...px.font }}>
            {/* Nav mini */}
            <Link href="/" style={{ color: colors.dark, fontSize: '8px', marginBottom: '24px', textDecoration: 'none' }}>
                ← VOLTAR AO PORTAL
            </Link>

            <div style={{ ...px.card, background: colors.card, padding: '32px', width: '100%', maxWidth: '380px' }}>
                <p style={{ fontSize: '12px', textAlign: 'center', marginBottom: '24px', color: colors.dark }}>
                    SIGN IN
                </p>

                {error && (
                    <div style={{ ...px.badge, background: '#ffc8a0', color: colors.error, marginBottom: '12px', width: '100%', textAlign: 'center', padding: '8px', fontSize: '7px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={px.label}>EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={px.input}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={px.label}>SENHA</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={px.input}
                        />
                    </div>
                    <button type="submit" style={{ ...px.btn, ...px.btnPrimary, width: '100%' }}>
                        ENTRAR
                    </button>
                </form>

                <p style={{ fontSize: '7px', color: colors.muted, textAlign: 'center', marginTop: '16px', lineHeight: '2' }}>
                    NÃO TEM CONTA?{' '}
                    <Link href="/register" style={{ color: colors.green, textDecoration: 'none' }}>REGISTRE-SE</Link>
                </p>
            </div>
        </div>
    );
}
