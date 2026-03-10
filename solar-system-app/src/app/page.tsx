'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroOverlay from '@/components/HeroOverlay';
import PlanetInfo from '@/components/PlanetInfo';
import MiniMap from '@/components/MiniMap';
import LoadingScreen from '@/components/LoadingScreen';
import useScrollCamera from '@/hooks/useScrollCamera';
import planetData from '@/utils/planetData';

// Dynamic import for the 3D scene (no SSR since Three.js needs the browser)
const SolarSystem = dynamic(() => import('@/three/SolarSystem'), {
  ssr: false,
});

export default function Home() {
  // Initialize smooth scrolling + GSAP ScrollTrigger
  useScrollCamera();

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* 3D Canvas (fixed background) */}
      <SolarSystem />

      {/* Navigation */}
      <Navbar />

      {/* Scrollable content container — gives scroll height for the journey */}
      <div className="overlay-content">
        {/* Hero Section */}
        <HeroOverlay />

        {/* Journey Scroll Container — one section per planet, snapped by GSAP.
            Neptune (last planet) is the final scroll stop. No content after it. */}
        <div id="journey-container">
          {planetData.map((planet, index) => (
            <section
              key={planet.id}
              id={`planet-${planet.id}`}
              className="planet-section"
              data-planet-index={index}
            >
              {/* Empty section — the 3D canvas handles visuals,
                  these sections provide scroll height for GSAP snap points */}
            </section>
          ))}
        </div>
      </div>

      {/* Floating UI overlays */}
      <PlanetInfo />
      <MiniMap />
    </>
  );
}
