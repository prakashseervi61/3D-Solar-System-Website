'use client';

import { ChevronDown } from 'lucide-react';

export default function HeroOverlay() {
    const handleExplore = () => {
        const journeySection = document.getElementById('planet-0'); // Snap to Sun
        if (journeySection) {
            if ((window as any).lenis) {
                (window as any).lenis.scrollTo(journeySection, { duration: 1.5, offset: 0 });
            } else {
                journeySection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            id="home"
            className="relative w-full min-h-screen flex items-center pt-[80px]"
        >
            {/* Background removed from here, moved directly behind text */}

            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 items-end md:items-center w-full min-h-[85vh] md:min-h-0 z-10 pb-20 md:pb-0">
                {/* Column 1: Left space for balance */}
                <div className="hidden md:block" />

                {/* Column 2: Core Focus (Headline + CTA) */}
                <div className="relative flex flex-col items-center text-center mt-[5vh] md:mt-[-4vh] md:-translate-x-6 lg:-translate-x-10 w-full max-w-[620px] mx-auto">

                    {/* Localized Blur Just Behind Text for Readability without blocking the Sun */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-95 scale-125"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(5, 7, 13, 0.8) 0%, rgba(5, 7, 13, 0.4) 40%, transparent 70%)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            maskImage: 'radial-gradient(ellipse at center, black 0%, black 45%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 45%, transparent 70%)'
                        }}
                    />

                    <h1
                        className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold text-starlight-white mb-4 md:mb-5 leading-[1.1] md:leading-[1.05]"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            letterSpacing: '1px',
                        }}
                    >
                        JOURNEY THROUGH
                        <br />
                        <span className="text-solar-orange flex flex-wrap justify-center items-center gap-x-2 gap-y-1 align-baseline mt-2 md:mt-3 relative pb-2 md:pb-0">
                            <span>THE</span>
                            <span className="bg-solar-orange/5 px-2 md:px-3 py-0.5 rounded-sm text-solar-orange shadow-[0_0_8px_rgba(255,122,26,0.1)] leading-none md:-translate-y-1 mx-1 md:mx-0">SOLAR</span>
                            <span>SYSTEM</span>
                        </span>
                    </h1>

                    <p
                        className="relative z-10 text-soft-gray text-xs sm:text-sm md:text-lg max-w-sm md:max-w-lg mb-6 md:mb-8 leading-relaxed opacity-90"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Embark on a cinematic exploration through our cosmic neighborhood.
                        Experience the blazing Sun before traveling to the distant reaches of Neptune.
                    </p>

                    <button
                        onClick={handleExplore}
                        className="relative z-10 hero-btn-glow px-8 py-3 md:px-12 md:py-4 bg-[#FF851B] text-white rounded-full font-bold tracking-[0.1em] transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs md:text-base mt-2 shadow-[0_8px_25px_rgba(255,120,0,0.6)]"
                    >
                        EXPLORE NOW
                    </button>
                </div>

                {/* Column 3: The right side for balanced spacing */}
                <div className="hidden md:block" />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                <span className="text-nebula-gray text-[10px] uppercase tracking-[0.3em] opacity-60">
                    Scroll to Explore
                </span>
                <ChevronDown className="w-5 h-5 text-planet-blue/50" />
            </div>
        </section>
    );
}
