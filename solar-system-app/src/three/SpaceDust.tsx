'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceDustProps {
    count?: number;
    rangeX?: number;
    rangeY?: number;
    rangeZ?: number;
    rotationSpeed?: number;
    size?: number;
}

function SpaceDust({
    count = 200,
    rangeX = 80,
    rangeY = 60,
    rangeZ = 400,
    rotationSpeed = 0.003,
    size = 0.12
}: SpaceDustProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * rangeX;
            pos[i * 3 + 1] = (Math.random() - 0.5) * rangeY;
            pos[i * 3 + 2] = (Math.random() - 0.5) * rangeZ;
        }
        return pos;
    }, [count, rangeX, rangeY, rangeZ]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * rotationSpeed;
            pointsRef.current.rotation.z += delta * (rotationSpeed * 0.5);
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
                size={size}
                sizeAttenuation
                color="#8B92A3"
                transparent
                opacity={0.3}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default memo(SpaceDust);
