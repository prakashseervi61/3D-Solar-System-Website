'use client';

import { ChevronDown } from 'lucide-react';

export default function HeroOverlay() {
    const handleExplore = () => {
        const journeySection = document.getElementById('journey');
        if (journeySection) {
            journeySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative w-full flex flex-col items-center justify-center text-center pointer-events-auto"
            style={{ height: '100vh', padding: '120px 20px 80px' }}
        >
            {/* Title */}
            <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-starlight-white mb-6 leading-tight"
                style={{
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '3px',
                    textShadow: '0 0 60px rgba(255, 122, 26, 0.3)',
                }}
            >
                JOURNEY THROUGH
                <br />
                <span className="text-solar-orange">THE SOLAR SYSTEM</span>
            </h1>

            {/* Subtitle */}
            <p
                className="text-soft-gray text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                Embark on a cinematic exploration through our cosmic neighborhood.
                Scroll to travel from the blazing Sun to the distant reaches of Neptune.
            </p>

            {/* CTA Button */}
            <button onClick={handleExplore} className="btn-primary text-lg px-8 py-3">
                Explore Now
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                <span
                    className="text-nebula-gray text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Scroll to Explore
                </span>
                <ChevronDown className="w-6 h-6 text-planet-blue" />
            </div>
        </section>
    );
}
