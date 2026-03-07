'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { colors, px } from '../../lib/pixelStyle';
import { Header } from '../../components/layout/Header';
import { ProfileForm } from '../../components/auth/ProfileForm';

export default function ProfilePage() {
    const router = useRouter();
    const { isAuthenticated, getUser } = useAuth();
    const [user, setUser] = useState<{
        userId: number;
        userEmail: string;
        userName: string;
        userAvatar: string;
    } | null>(null);
    const [liveAvatar, setLiveAvatar] = useState('1');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        const u = getUser();
        if (!u) { router.push('/login'); return; }
        setUser(u);
        setLiveAvatar(u.userAvatar);

        // Fetch fresh avatar from backend
        api.users.getProfile(u.userId)
            .then((profile) => {
                const av = profile.Avatar || '1';
                setLiveAvatar(av);
            })
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    if (!user || !loaded) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: colors.bg, ...px.font }}>
                <p style={{ fontSize: '9px', color: colors.muted }}>CARREGANDO...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: colors.bg, ...px.font }}>
            <Header userName={user.userName} userAvatar={liveAvatar} />
            <ProfileForm
                userId={user.userId}
                initialName={user.userName}
                initialAvatar={liveAvatar}
                onAvatarChange={setLiveAvatar}
            />
        </div>
    );
}
