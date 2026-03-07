'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PokemonCapture } from '../../components/pokemon/PokemonCapture';

export default function CapturePage() {
    const router = useRouter();
    const { isAuthenticated, getUser } = useAuth();
    const [user, setUser] = useState<{ userId: number; userEmail: string } | null>(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        setUser(getUser());
    }, []);

    if (!user) return null;

    return <PokemonCapture userId={user.userId} userEmail={user.userEmail} />;
}
