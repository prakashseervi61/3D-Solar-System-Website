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
            // On mobile, keep planet centered (x=0) and scaled responsibly (viewDist)
            // On mobile, the planet is slightly higher (y offset) to clear the bottom card
            const viewDistMobile = planet.isSun ? 16 : planet.radius * 6 + 4;
            const viewDistDesktop = planet.isSun ? 15 : planet.radius * 4 + 2;
            const viewDist = mobile ? viewDistMobile : viewDistDesktop;

            const yOffset = mobile ? planet.radius * 0.8 + 2 : planet.isSun ? planet.radius * 2.2 : planet.radius * 1.5;
            const xOffset = mobile ? 0 : planet.isSun ? 0 : planet.radius * 1.2; // Keep Sun perfectly centered

            return {
                position: new THREE.Vector3(
                    xOffset,
                    yOffset,
                    planet.position[2] + viewDist
                ),
                lookAt: new THREE.Vector3(
                    planet.position[0], // Keep lookAt X centered
                    planet.isSun ? (mobile ? -2.5 : 1.5) : planet.position[1], // Look lower to push Sun UP on the screen
                    planet.position[2]
                ),
            };
        });
    }, [isMobile.current]);

    useFrame((state) => {
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

        // CINEMATIC: "Space Warp" Zoom Effect
        // While transitioning (near t=0.5), we slightly "zoom in" to the path
        // by moving the camera closer to the lookAt target.
        const zoomEffect = Math.sin(t * Math.PI) * 1.5; // peaks at t=0.5
        const toTargetDir = new THREE.Vector3().subVectors(targetLookAt.current, targetPos.current).normalize();
        targetPos.current.add(toTargetDir.multiplyScalar(zoomEffect));

        // Add subtle cinematic orbital drift when near a planet
        const nearness = 1 - Math.abs(easedT - 0.5) * 2; // peaks at snap points
        const time = state.clock.elapsedTime * 0.3;
        const orbitRadius = planetData[currentPlanetIndex].radius * 0.3 * nearness * (isMobile.current ? 0.5 : 1);
        targetPos.current.x += Math.sin(time) * orbitRadius;
        targetPos.current.y += Math.cos(time * 0.7) * orbitRadius * 0.3;

        // Smooth damping
        smoothPos.current.lerp(targetPos.current, 0.08);
        smoothLookAt.current.lerp(targetLookAt.current, 0.08);

        camera.position.copy(smoothPos.current);
        camera.lookAt(smoothLookAt.current);
    });

    return null;
}

function SceneContent() {
    const setIsLoading = useStore((s) => s.setIsLoading);
    const scrollProgress = useStore((s) => s.scrollProgress);
    const starfieldRef = useRef<THREE.Group>(null);
    const dustRef = useRef<THREE.Group>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [setIsLoading]);

    // Parallax background movement
    useFrame(() => {
        if (starfieldRef.current) {
            // Layer 1 (Far): Very slow movement
            starfieldRef.current.position.z = -scrollProgress * 500;
        }
        if (dustRef.current) {
            // Layer 2 (Mid): Medium movement
            dustRef.current.position.z = -scrollProgress * 1200;
        }
    });

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

            {/* Layer 1: Far Stars (Static-ish) */}
            <group ref={starfieldRef}>
                <Starfield count={2500} radiusMin={400} radiusMax={800} rotationSpeed={0.001} starSize={0.2} />
            </group>

            {/* Layer 2: Mid Stars (Parallax) */}
            <group ref={dustRef}>
                <Starfield count={1500} radiusMin={200} radiusMax={400} rotationSpeed={0.003} starSize={0.4} />
                <SpaceDust count={200} rangeX={150} rangeY={100} rangeZ={600} rotationSpeed={0.005} />
            </group>

            {/* Layer 3: Near Dust (Fast Parallax) */}
            <group>
                <SpaceDust count={150} rangeX={100} rangeY={60} rangeZ={200} rotationSpeed={0.01} size={0.18} />
            </group>

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
