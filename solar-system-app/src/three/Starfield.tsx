'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Starfield({ count = 3000 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Distribute stars in a large sphere
            const radius = 150 + Math.random() * 350;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Color variation: white to warm-white to blue-white
            const brightness = 0.7 + Math.random() * 0.3;
            const warmth = Math.random();
            colors[i * 3] = brightness + warmth * 0.05;
            colors[i * 3 + 1] = brightness;
            colors[i * 3 + 2] = brightness + (1 - warmth) * 0.08;

            // Size variation for depth
            sizes[i] = 0.3 + Math.random() * 0.5;
        }

        return { positions, colors, sizes };
    }, [count]);

    // Very slow rotation for subtle movement
    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.003;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.4}
                sizeAttenuation
                vertexColors
                transparent
                opacity={0.85}
                depthWrite={false}
            />
        </points>
    );
}

export default memo(Starfield);
