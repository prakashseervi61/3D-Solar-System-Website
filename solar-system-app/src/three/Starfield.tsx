'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
    count?: number;
    radiusMin?: number;
    radiusMax?: number;
    rotationSpeed?: number;
    starSize?: number;
}

function Starfield({
    count = 2000,
    radiusMin = 150,
    radiusMax = 500,
    rotationSpeed = 0.002,
    starSize = 0.4
}: StarfieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            const brightness = 0.6 + Math.random() * 0.4;
            colors[i * 3] = brightness;
            colors[i * 3 + 1] = brightness;
            colors[i * 3 + 2] = brightness + Math.random() * 0.1;
        }

        return { positions, colors };
    }, [count, radiusMin, radiusMax]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * rotationSpeed;
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
                size={starSize}
                sizeAttenuation
                vertexColors
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default memo(Starfield);
