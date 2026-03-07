'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { colors, px } from '../../lib/pixelStyle';
import { TrainerAvatar } from '../../lib/trainers';

interface HeaderProps {
    userName: string;
    userAvatar: string;
}

export function Header({ userName, userAvatar }: HeaderProps) {
    const router = useRouter();
    const { logout } = useAuth();

    async function handleLogout() {
        await logout();
        router.push('/');
    }

    return (
        <nav
            className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
            style={{ background: colors.dark, borderBottom: '4px solid #000', ...px.font }}
        >
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" fill="white" stroke="white" strokeWidth="2"/>
                    <path d="M1 14 Q1 1 14 1 Q27 1 27 14Z" fill="#e3342f"/>
                    <rect x="1" y="13" width="26" height="2" fill="white"/>
                    <circle cx="14" cy="14" r="4" fill="#1a1c2c" stroke="white" strokeWidth="2"/>
                    <circle cx="14" cy="14" r="2" fill="#e3342f"/>
                </svg>
                <span style={{ color: '#fff', fontSize: '10px', letterSpacing: '1px' }}>PALLET PORTAL</span>
            </Link>

            <div className="flex items-center gap-4">
                {/* Trainer icon + name */}
                <div className="flex items-center gap-2">
                    <TrainerAvatar trainerId={userAvatar} size={28} />
                    <span style={{ color: colors.muted, fontSize: '7px' }}>{userName.toUpperCase()}</span>
                </div>

                {/* Profile button */}
                <Link
                    href="/profile"
                    style={{ ...px.btn, ...px.btnSecondary, fontSize: '7px', padding: '6px 10px', textDecoration: 'none' }}
                >
                    PERFIL
                </Link>

                <button
                    onClick={handleLogout}
                    style={{ ...px.btn, ...px.btnDanger, fontSize: '7px', padding: '6px 10px' }}
                >
                    SAIR
                </button>
            </div>
        </nav>
    );
}
