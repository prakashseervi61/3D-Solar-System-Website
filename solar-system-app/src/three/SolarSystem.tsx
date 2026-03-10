'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
import Starfield from './Starfield';
import SpaceDust from './SpaceDust';
import planetData from '@/utils/planetData';
import useStore from '@/store/useStore';

function CameraController() {
    const { camera } = useThree();
    const currentPlanetIndex = useStore((s) => s.currentPlanetIndex);
    const scrollProgress = useStore((s) => s.scrollProgress);

    const targetPos = useRef(new THREE.Vector3(0, 2, 20));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const smoothPos = useRef(new THREE.Vector3(0, 2, 20));
    const smoothLookAt = useRef(new THREE.Vector3(0, 0, 0));

    // Detect if we're on a mobile device for responsive camera positioning
    const isMobile = useRef(false);

    useEffect(() => {
        const checkMobile = () => {
            isMobile.current = window.innerWidth <= 768;
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Precompute camera positions for each planet
    const cameraStops = useMemo(() => {
        return planetData.map((planet) => {
            const mobile = isMobile.current;

            // On mobile, keep planet centered (x=0) and scaled responsibly (viewDist)
            // On mobile, the planet is slightly higher (y offset) to clear the bottom card
            const viewDistMobile = planet.isSun ? 15 : planet.radius * 6 + 4;
            const viewDistDesktop = planet.isSun ? 12 : planet.radius * 4 + 2;
            const viewDist = mobile ? viewDistMobile : viewDistDesktop;

            const yOffset = mobile ? planet.radius * 0.8 + 1 : planet.radius * 0.6 + 1;
            const xOffset = mobile ? 0 : planet.radius * 1.2;

            return {
                position: new THREE.Vector3(
                    xOffset,
                    yOffset,
                    planet.position[2] + viewDist
                ),
                lookAt: new THREE.Vector3(
                    planet.position[0],
                    planet.position[1],
                    planet.position[2]
                ),
            };
        });
    }, [isMobile.current]);

    useFrame(() => {
        const totalPlanets = planetData.length;
        const lastIndex = totalPlanets - 1;

        // Clamp scroll progress to [0, 1] — Neptune is the hard stop
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Determine exact fractional index from continuous scroll progress
        const exactIndex = Math.min(clampedProgress * lastIndex, lastIndex);
        const fromIndex = Math.min(Math.floor(exactIndex), lastIndex);
        const toIndex = Math.min(fromIndex + 1, lastIndex);
        const t = exactIndex - fromIndex;

        // Smooth ease for the transition fraction
        const easedT = t * t * (3 - 2 * t); // smoothstep

        const from = cameraStops[fromIndex];
        const to = cameraStops[toIndex];

        // Interpolate camera position and lookAt between planet stops
        targetPos.current.lerpVectors(from.position, to.position, easedT);
        targetLookAt.current.lerpVectors(from.lookAt, to.lookAt, easedT);

        // Add subtle cinematic orbital drift when near a planet
        const nearness = 1 - Math.abs(easedT - 0.5) * 2; // peaks at snap points
        const time = performance.now() * 0.0003;
        const orbitRadius = planetData[currentPlanetIndex].radius * 0.3 * nearness;
        targetPos.current.x += Math.sin(time) * orbitRadius;
        targetPos.current.y += Math.cos(time * 0.7) * orbitRadius * 0.3;

        // Smooth damping — higher lerp factor for responsive feel
        smoothPos.current.lerp(targetPos.current, 0.08);
        smoothLookAt.current.lerp(targetLookAt.current, 0.08);

        camera.position.copy(smoothPos.current);
        camera.lookAt(smoothLookAt.current);
    });

    return null;
}

function SceneContent() {
    const setIsLoading = useStore((s) => s.setIsLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [setIsLoading]);

    return (
        <>
            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.12} color="#4466AA" />

            {/* Sun */}
            <Sun />

            {/* Planets (skip index 0 = Sun) */}
            {planetData.slice(1).map((planet) => (
                <Planet key={planet.id} data={planet} />
            ))}

            {/* Space environment — optimized particle counts */}
            <Starfield count={3000} />
            <SpaceDust count={300} />

            {/* Camera controller */}
            <CameraController />
        </>
    );
}

export default function SolarSystem() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{
                    fov: 60,
                    near: 0.1,
                    far: 1000,
                    position: [0, 2, 20],
                }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                style={{ background: '#05070D' }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                frameloop="always"
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
