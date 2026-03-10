'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import useStore from '@/store/useStore';
import planetData from '@/utils/planetData';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function useScrollCamera() {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);
    const setScrollProgress = useStore((s) => s.setScrollProgress);
    const setCurrentPlanetIndex = useStore((s) => s.setCurrentPlanetIndex);
    const setIsSnapped = useStore((s) => s.setIsSnapped);
    const isLoading = useStore((s) => s.isLoading);

    useEffect(() => {
        // Initialize Lenis smooth scrolling with cinematic inertia
        const lenis = new Lenis({
            duration: 1.6, // Longer duration for floating feel
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2.0, // Increase touch sensitivity for swipes
            syncTouch: true, // Hijack native touch for perfect GSAP physics translation
            infinite: false,
        });
        lenisRef.current = lenis;
        (window as any).lenis = lenis; // Expose globally to fix scroll jumping issues

        // Pause/Resume Lenis based on isLoading state
        if (isLoading) {
            lenis.stop();
        } else {
            lenis.start();
        }

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Calculate snap points — one per planet stop
        const totalPlanets = planetData.length;
        const sectionSnapPoints = Array.from({ length: totalPlanets }, (_, i) => i / (totalPlanets - 1));

        // Create the main scrolling timeline
        const journeyEl = document.getElementById('journey-container');
        if (!journeyEl) return;

        // Snap timer — detect when user stops scrolling (snapped)
        let snapTimer: ReturnType<typeof setTimeout> | null = null;

        const mainST = ScrollTrigger.create({
            trigger: journeyEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2, // Higher scrub for smoother "Space Float"
            snap: {
                snapTo: sectionSnapPoints,
                duration: { min: 0.5, max: 1.2 },
                ease: 'power3.inOut', // Cinematic snap
                delay: 0.1,
            },
            onUpdate: (self) => {
                const progress = self.progress;
                setScrollProgress(progress);

                // Calculate current planet index
                const planetIndex = Math.round(progress * (totalPlanets - 1));
                setCurrentPlanetIndex(Math.max(0, Math.min(planetIndex, totalPlanets - 1)));

                // Mark as not snapped during transitions
                setIsSnapped(false);
                if (snapTimer) clearTimeout(snapTimer);
                snapTimer = setTimeout(() => {
                    setIsSnapped(true);
                }, 400);
            },
            onSnapComplete: () => {
                // Ensure floating inertia is handled nicely after snap
                setIsSnapped(true);
            }
        });

        // RAF loop
        function raf(time: number) {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        }
        rafIdRef.current = requestAnimationFrame(raf);

        // Initial state
        setIsSnapped(true);

        return () => {
            if (snapTimer) clearTimeout(snapTimer);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            mainST.kill();
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, [setScrollProgress, setCurrentPlanetIndex, setIsSnapped]);

    // Separate effect for controlling Lenis stop/start based on isLoading state
    useEffect(() => {
        if (lenisRef.current) {
            if (isLoading) {
                lenisRef.current.stop();
            } else {
                lenisRef.current.start();
            }
        }
    }, [isLoading]);

    return lenisRef;
}
