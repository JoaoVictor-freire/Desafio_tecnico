'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { PokemonDashboard } from '../../components/pokemon/PokemonDashboard';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, getUser } = useAuth();
    const [user, setUser] = useState<{ userId: number; userEmail: string; userName: string; userAvatar: string } | null>(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        setUser(getUser());
    }, []);

    if (!user) return null;

    return <PokemonDashboard userId={user.userId} userName={user.userName} userAvatar={user.userAvatar} />;
}
