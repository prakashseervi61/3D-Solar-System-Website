'use client';

import { memo, useState, useEffect } from 'react';
import useStore from '@/store/useStore';
import planetData from '@/utils/planetData';
import { Globe, Ruler, Navigation, Clock, Sparkles } from 'lucide-react';

function PlanetInfo() {
    const currentPlanetIndex = useStore((s) => s.currentPlanetIndex);
    const isSnapped = useStore((s) => s.isSnapped);
    const planet = planetData[currentPlanetIndex];

    // Local state to hide the card on the initial landing Hero section
    const [isHero, setIsHero] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // If we haven't scrolled past half the screen, we're still on the Hero
            setIsHero(window.scrollY < window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check immediately on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Show the panel when snapped to a planet AND we are not on the hero landing page
    const isVisible = isSnapped && !isHero;

    if (!planet) return null;

    return (
        <div
            className={`fixed z-30 transition-all duration-700 ease-out 
        /* Mobile Position (Center Bottom) */
        bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px]
        /* Desktop Position (Far Right Center) */
        md:bottom-auto md:top-1/2 md:right-4 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:max-w-[360px]
        ${isVisible
                    ? 'opacity-100 translate-y-0 md:translate-x-0'
                    : 'opacity-0 translate-y-8 md:translate-x-32 pointer-events-none'
                }`}
        >
            <div
                className="p-6 md:p-8 rounded-[12px] border border-white/10"
                style={{
                    background: 'rgba(20, 20, 20, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                {/* Planet Name */}
                <h2
                    className="text-[28px] md:text-3xl font-semibold md:font-bold text-starlight-white mb-3 md:mb-2 uppercase tracking-wide md:tracking-wider leading-tight"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        color: planet.color,
                        textShadow: `0 0 30px ${planet.color}60`,
                    }}
                >
                    {planet.name}
                </h2>

                {/* Stats Grid - 2 Column Layout for Mobile */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
                    <StatItem
                        icon={<Ruler className="w-4 h-4" />}
                        label="Diameter"
                        value={planet.diameter}
                    />
                    <StatItem
                        icon={<Navigation className="w-4 h-4" />}
                        label="Distance"
                        value={planet.distanceFromSun}
                    />
                    <StatItem
                        icon={<Clock className="w-4 h-4" />}
                        label="Day Length"
                        value={planet.dayLength}
                    />
                    <StatItem
                        icon={<Globe className="w-4 h-4" />}
                        label="Year Length"
                        value={planet.yearLength}
                    />
                </div>

                {/* Description - Below Stats on Mobile */}
                <p
                    className="text-soft-gray text-sm md:text-sm mb-4 md:mb-5 leading-[1.5] md:leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {planet.description}
                </p>

                {/* Fun Fact - Hidden or Smaller on mobile? Let's keep it compact */}
                <div className="flex items-start gap-2 bg-white/5 rounded-xl p-3">
                    <Sparkles className="w-4 h-4 text-saturn-gold mt-0.5 flex-shrink-0" />
                    <p
                        className="text-[12px] text-soft-gray leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {planet.funFact}
                    </p>
                </div>
            </div>
        </div>
    );
}

const StatItem = memo(function StatItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-nebula-gray opacity-70">
                {icon}
                <span className="text-[11px] uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-starlight-white text-[15px] font-semibold">{value}</span>
        </div>
    );
});

export default memo(PlanetInfo);
