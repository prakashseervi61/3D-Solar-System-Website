'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SpaceDust({ count = 300 }) {
    const pointsRef = useRef<THREE.Points>(null);

    // Static dust — no per-frame position updates to prevent lag
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 80;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 2] = Math.random() * -350;
        }
        return pos;
    }, [count]);

    // Very slow rotation instead of per-particle position updates
    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.003;
            pointsRef.current.rotation.x += delta * 0.001;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                sizeAttenuation
                color="#8B92A3"
                transparent
                opacity={0.35}
                depthWrite={false}
            />
        </points>
    );
}

export default memo(SpaceDust);
