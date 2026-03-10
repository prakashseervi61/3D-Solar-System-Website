'use client';

import { useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '@/utils/planetData';
import useStore from '@/store/useStore';
import planetData from '@/utils/planetData';
import { getAssetPath } from '@/utils/basePath';

interface PlanetProps {
    data: PlanetData;
}

function PlanetSurface({ data }: { data: PlanetData }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const currentPlanetIndex = useStore((s) => s.currentPlanetIndex);
    const isSnapped = useStore((s) => s.isSnapped);

    const isActive = planetData[currentPlanetIndex]?.id === data.id;

    // Only load if textureUrl exists
    const texture = useLoader(THREE.TextureLoader, getAssetPath(data.textureUrl || '/textures/mercury.png'));

    if (texture) {
        texture.anisotropy = 16;
        texture.colorSpace = THREE.SRGBColorSpace;
    }

    useFrame((state) => {
        if (meshRef.current) {
            // Rotate faster when active
            const rotationMultiplier = isActive && isSnapped ? 1.5 : 1.0;
            meshRef.current.rotation.y += data.rotationSpeed * rotationMultiplier;

            // Pulse/Scale up effect when active
            const targetScale = isActive && isSnapped ? 1.05 : 1.0;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

            // Subtle orbital wobble
            if (isActive && isSnapped) {
                meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            }
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[data.radius, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                color={texture ? '#FFFFFF' : data.color}
                roughness={0.7}
                metalness={0.1}
                emissive={data.emissive || data.color}
                emissiveIntensity={texture ? 0.02 : (data.emissiveIntensity || 0.05)}
            />
        </mesh>
    );
}

function PlanetRings({ data }: { data: PlanetData }) {
    const ringRef = useRef<THREE.Mesh>(null);
    const currentPlanetIndex = useStore((s) => s.currentPlanetIndex);
    const isSnapped = useStore((s) => s.isSnapped);

    const isActive = planetData[currentPlanetIndex]?.id === data.id;

    // Use a fallback to ensure the hook always receives a string, even if empty
    // but better to only use this component if rings exist.
    const ringTexture = useLoader(THREE.TextureLoader, getAssetPath(data.ringTextureUrl || '/textures/saturn_rings.png'));

    if (ringTexture) {
        ringTexture.anisotropy = 16;
        ringTexture.colorSpace = THREE.SRGBColorSpace;
    }

    useFrame(() => {
        if (ringRef.current) {
            const rotationMultiplier = isActive && isSnapped ? 1.2 : 1.0;
            ringRef.current.rotation.z += 0.0005 * rotationMultiplier;

            const targetScale = isActive && isSnapped ? 1.03 : 1.0;
            ringRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
                args={[
                    data.radius * 1.4,
                    data.name === 'Saturn' ? data.radius * 2.8 : data.radius * 2.2,
                    128
                ]}
            />
            <meshStandardMaterial
                map={ringTexture}
                color={ringTexture ? '#FFFFFF' : (data.ringColor || '#C8A96E')}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
                roughness={0.8}
                metalness={0.2}
            />
        </mesh>
    );
}

export default function Planet({ data }: PlanetProps) {
    const atmosphereRef = useRef<THREE.Mesh>(null);

    // Axial tilt: Saturn is ~26°, Uranus is ~98°, others are consistent
    const axialTilt = data.name === 'Saturn' ? 0.46 : data.name === 'Uranus' ? Math.PI / 2.1 : 0.4;

    return (
        <group position={data.position} rotation={[axialTilt, 0, 0]}>
            <Suspense fallback={null}>
                <PlanetSurface data={data} />
            </Suspense>

            {/* Atmosphere glow */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[data.radius * 1.15, 32, 32]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.06}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Rings system */}
            {data.hasRings && (
                <Suspense fallback={null}>
                    <PlanetRings data={data} />
                </Suspense>
            )}

            {/* Earth special: halo */}
            {data.name === 'Earth' && (
                <mesh>
                    <sphereGeometry args={[data.radius * 1.3, 32, 32]} />
                    <meshBasicMaterial
                        color="#4EDFFF"
                        transparent
                        opacity={0.03}
                        side={THREE.BackSide}
                    />
                </mesh>
            )}
        </group>
    );
}
