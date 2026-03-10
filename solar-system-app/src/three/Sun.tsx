'use client';

import { useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function SunSurface() {
    const sunRef = useRef<THREE.Mesh>(null);

    // High-res solar plasma texture
    const texture = useLoader(THREE.TextureLoader, '/textures/sun.png');

    if (texture) {
        texture.anisotropy = 16;
        texture.colorSpace = THREE.SRGBColorSpace;
    }

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={sunRef}>
            <sphereGeometry args={[4, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                emissiveMap={texture}
                emissive="#FFFFFF"
                emissiveIntensity={1.8}
                roughness={0.4}
                metalness={0.1}
            />
        </mesh>
    );
}

export default function Sun() {
    const coronaRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (coronaRef.current) {
            const scale = 1.0 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
            coronaRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Main Sun with texture */}
            <Suspense fallback={
                <mesh>
                    <sphereGeometry args={[4, 32, 32]} />
                    <meshStandardMaterial color="#FDB813" emissive="#FF6600" emissiveIntensity={2} />
                </mesh>
            }>
                <SunSurface />
            </Suspense>

            {/* Corona glow */}
            <mesh ref={coronaRef}>
                <sphereGeometry args={[4.8, 32, 32]} />
                <meshBasicMaterial
                    color="#FF8C00"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer atmosphere glow */}
            <mesh>
                <sphereGeometry args={[6.5, 32, 32]} />
                <meshBasicMaterial
                    color="#FF6600"
                    transparent
                    opacity={0.06}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Sun as intensive light source */}
            <pointLight
                color="#FFF5E0"
                intensity={350}
                distance={600}
                decay={1.2}
            />
        </group>
    );
}
