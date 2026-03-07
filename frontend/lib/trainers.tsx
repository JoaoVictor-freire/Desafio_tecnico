import React from 'react';

export interface TrainerDef {
    id: string;
    name: string;
    capColor: string;
    bodyColor: string;
    pantsColor: string;
}

export const TRAINERS: TrainerDef[] = [
    { id: '1', name: 'RED',      capColor: '#cc2200', bodyColor: '#cc2200', pantsColor: '#404040' },
    { id: '2', name: 'LEAF',     capColor: '#22aa44', bodyColor: '#22aa44', pantsColor: '#ffe060' },
    { id: '3', name: 'BLUE',     capColor: '#2244cc', bodyColor: '#2244cc', pantsColor: '#404040' },
    { id: '4', name: 'MISTY',    capColor: '#ff4488', bodyColor: '#ff4488', pantsColor: '#ffe060' },
    { id: '5', name: 'BROCK',    capColor: '#886644', bodyColor: '#cc8800', pantsColor: '#404040' },
    { id: '6', name: 'ROCKET',   capColor: '#202020', bodyColor: '#303030', pantsColor: '#202020' },
    { id: '7', name: 'PSYCHIC',  capColor: '#8844cc', bodyColor: '#8844cc', pantsColor: '#404040' },
    { id: '8', name: 'ELITE',    capColor: '#cc8800', bodyColor: '#cc8800', pantsColor: '#202020' },
];

interface TrainerAvatarProps {
    trainerId: string;
    size?: number;
}

export function TrainerAvatar({ trainerId, size = 40 }: TrainerAvatarProps) {
    const trainer = TRAINERS.find((t) => t.id === trainerId) || TRAINERS[0];
    const { capColor, bodyColor, pantsColor } = trainer;
    const w = size;
    const h = Math.round(size * 1.5);

    return (
        <svg
            width={w}
            height={h}
            viewBox="0 0 16 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ imageRendering: 'pixelated', display: 'block' }}
        >
            {/* Cap */}
            <rect x="4" y="0" width="8" height="4" fill={capColor} />
            {/* Cap brim */}
            <rect x="3" y="3" width="10" height="2" fill={capColor} />
            {/* Face/Head */}
            <rect x="4" y="5" width="8" height="6" fill="#f0c080" />
            {/* Eyes */}
            <rect x="5" y="7" width="2" height="2" fill="#4a3728" />
            <rect x="9" y="7" width="2" height="2" fill="#4a3728" />
            {/* Body / shirt */}
            <rect x="2" y="11" width="12" height="7" fill={bodyColor} />
            {/* Arms */}
            <rect x="0" y="11" width="3" height="5" fill={bodyColor} />
            <rect x="13" y="11" width="3" height="5" fill={bodyColor} />
            {/* Left leg */}
            <rect x="3" y="18" width="4" height="4" fill={pantsColor} />
            {/* Right leg */}
            <rect x="9" y="18" width="4" height="4" fill={pantsColor} />
            {/* Shoes */}
            <rect x="2" y="21" width="5" height="3" fill="#202020" />
            <rect x="9" y="21" width="5" height="3" fill="#202020" />
        </svg>
    );
}
