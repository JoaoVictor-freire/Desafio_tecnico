'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { colors, px } from '../../lib/pixelStyle';
import { TRAINERS, TrainerAvatar } from '../../lib/trainers';
import { Header } from '../layout/Header';

const PASSWORD_RULES = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?]).{8,}$/;

interface ProfileFormProps {
    userId: number;
    initialName: string;
    initialAvatar: string;
    onAvatarChange: (avatar: string) => void;
}

export function ProfileForm({ userId, initialName, initialAvatar, onAvatarChange }: ProfileFormProps) {
    const router = useRouter();
    const { updateLocalProfile } = useAuth();

    const [name, setName] = useState(initialName);
    const [avatar, setAvatar] = useState(initialAvatar || '1');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function validatePassword(pwd: string): string {
        if (pwd.length < 8) return 'A SENHA DEVE TER PELO MENOS 8 CARACTERES';
        if (!/[A-Z]/.test(pwd)) return 'A SENHA DEVE TER PELO MENOS UMA LETRA MAIÚSCULA';
        if (!/[0-9]/.test(pwd)) return 'A SENHA DEVE TER PELO MENOS UM NÚMERO';
        if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(pwd)) return 'A SENHA DEVE TER PELO MENOS UM CARACTERE ESPECIAL';
        return '';
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name.trim()) { setError('NOME NÃO PODE ESTAR VAZIO'); return; }

        if (newPassword) {
            const pwdError = validatePassword(newPassword);
            if (pwdError) { setError(pwdError); return; }
            if (newPassword !== confirmPassword) { setError('AS SENHAS NÃO COINCIDEM'); return; }
        }

        setLoading(true);
        try {
            const payload: { Name?: string; Password?: string; Avatar?: string } = {
                Name: name,
                Avatar: avatar,
            };
            if (newPassword) payload.Password = newPassword;

            await api.users.update(userId, payload);
            updateLocalProfile(name, avatar);
            onAvatarChange(avatar);
            setSuccess('PERFIL ATUALIZADO COM SUCESSO!');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message || 'ERRO AO ATUALIZAR PERFIL');
        } finally {
            setLoading(false);
            
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 16px' }}>
            <p style={{ fontSize: '12px', color: colors.dark, marginBottom: '24px' }}>MEU PERFIL</p>

            {error && (
                <div style={{ ...px.badge, background: '#ffc8a0', color: colors.error, padding: '10px', width: '100%', textAlign: 'center', marginBottom: '16px', fontSize: '7px' }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{ ...px.badge, background: '#b8e8a0', color: colors.success, padding: '10px', width: '100%', textAlign: 'center', marginBottom: '16px', fontSize: '7px' }}>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ ...px.card, background: colors.card, padding: '20px', marginBottom: '16px' }}>
                    <p style={{ fontSize: '9px', color: colors.dark, marginBottom: '12px' }}>INFORMAÇÕES</p>
                    <div>
                        <label style={px.label}>NOME DO TREINADOR</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={px.input}
                        />
                    </div>
                </div>

                {/* Avatar picker */}
                <div style={{ ...px.card, background: colors.card, padding: '20px', marginBottom: '16px' }}>
                    <p style={{ fontSize: '9px', color: colors.dark, marginBottom: '12px' }}>ÍCONE DE TREINADOR</p>
                    <div className="grid grid-cols-4 gap-3">
                        {TRAINERS.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => {
                                    setAvatar(t.id);
                                }}
                                style={{
                                    border: avatar === t.id ? `3px solid ${colors.green}` : '3px solid #000',
                                    boxShadow: avatar === t.id ? `0 0 0 2px ${colors.dark}` : '2px 2px 0 #000',
                                    background: avatar === t.id ? colors.dark : '#fff',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <TrainerAvatar trainerId={t.id} size={36} />
                                <span style={{ fontSize: '6px', color: avatar === t.id ? colors.green : colors.dark }}>
                                    {t.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Password */}
                <div style={{ ...px.card, background: colors.card, padding: '20px', marginBottom: '20px' }}>
                    <p style={{ fontSize: '9px', color: colors.dark, marginBottom: '4px' }}>ALTERAR SENHA</p>
                    <p style={{ fontSize: '7px', color: colors.muted, marginBottom: '12px' }}>
                        DEIXE EM BRANCO PARA MANTER A SENHA ATUAL
                    </p>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={px.label}>NOVA SENHA</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={px.input}
                            placeholder="Mín. 8 chars, 1 maiúscula, 1 número, 1 especial"
                        />
                    </div>
                    <div>
                        <label style={px.label}>CONFIRMAR NOVA SENHA</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={px.input}
                        />
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '6px', color: colors.muted, lineHeight: 2 }}>
                        <p>• PELO MENOS 8 CARACTERES</p>
                        <p>• PELO MENOS 1 LETRA MAIÚSCULA</p>
                        <p>• PELO MENOS 1 NÚMERO</p>
                        <p>• PELO MENOS 1 CARACTERE ESPECIAL (!@#$%...)</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ ...px.btn, ...px.btnPrimary, opacity: loading ? 0.6 : 1 }}
                    >
                        {loading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard')}
                        style={{ ...px.btn, ...px.btnSecondary }}
                    >
                        ← VOLTAR
                    </button>
                </div>
            </form>
        </div>
    );
}
