'use client';

import { useEffect } from 'react';
import useStore from '@/store/useStore';

export default function LoadingScreen() {
    const isLoading = useStore((s) => s.isLoading);

    // Disable scrolling when loading using useEffect for stability
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoading]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ${isLoading
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
            style={{ background: '#05070D' }}
        >
            {/* Animated Sun */}
            <div
                className="w-20 h-20 rounded-full loading-pulse mb-8"
                style={{
                    background: 'radial-gradient(circle, #FDB813 0%, #FF6600 60%, transparent 70%)',
                }}
            />

            {/* Loading Text */}
            <h2
                className="text-starlight-white text-xl font-bold tracking-widest uppercase mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                Preparing Your Journey
            </h2>
            <p
                className="text-nebula-gray text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Loading the Solar System...
            </p>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                <div
                    className="h-full rounded-full animate-pulse"
                    style={{
                        background: 'linear-gradient(90deg, #FF7A1A, #FFB347)',
                        width: '70%',
                    }}
                />
            </div>
        </div>
    );
}
