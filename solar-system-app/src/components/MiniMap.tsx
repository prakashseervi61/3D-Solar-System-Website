'use client';

import { memo } from 'react';
import useStore from '@/store/useStore';
import planetData from '@/utils/planetData';

function MiniMap() {
    const currentPlanetIndex = useStore((s) => s.currentPlanetIndex);
    const scrollProgress = useStore((s) => s.scrollProgress);

    // Only show after scrolling past the hero
    if (scrollProgress < 0.01) return null;

    const handleClick = (index: number) => {
        const container = document.getElementById('journey-container');
        if (!container) return;
        const totalHeight = container.scrollHeight;
        const targetScroll = (index / (planetData.length - 1)) * totalHeight;
        // Add offset for the hero section
        const heroHeight = window.innerHeight;
        window.scrollTo({ top: heroHeight + targetScroll, behavior: 'smooth' });
    };

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-0">
            {/* Connecting line */}
            <div className="absolute top-3 bottom-3 w-[2px] bg-white/10 rounded-full">
                <div
                    className="w-full bg-planet-blue rounded-full transition-all duration-700 ease-out"
                    style={{
                        height: `${(currentPlanetIndex / (planetData.length - 1)) * 100}%`,
                    }}
                />
            </div>

            {/* Planet dots */}
            {planetData.map((planet, index) => (
                <button
                    key={planet.id}
                    className="relative flex items-center gap-3 bg-transparent border-none cursor-pointer p-0"
                    style={{ marginBottom: index < planetData.length - 1 ? '20px' : '0' }}
                    onClick={() => handleClick(index)}
                    aria-label={`Go to ${planet.name}`}
                >
                    {/* Dot */}
                    <div
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-500 z-10 ${index === currentPlanetIndex
                                ? 'border-planet-blue bg-planet-blue shadow-[0_0_12px_rgba(78,223,255,0.6)] scale-125'
                                : index < currentPlanetIndex
                                    ? 'border-planet-blue/50 bg-planet-blue/30'
                                    : 'border-white/20 bg-transparent'
                            }`}
                    />

                    {/* Label */}
                    <span
                        className={`text-[10px] uppercase tracking-wider whitespace-nowrap transition-all duration-500 ${index === currentPlanetIndex
                                ? 'text-planet-blue font-semibold translate-x-1'
                                : 'text-nebula-gray/60'
                            }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {planet.name}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default memo(MiniMap);
