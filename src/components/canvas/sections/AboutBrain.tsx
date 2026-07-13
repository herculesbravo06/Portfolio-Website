"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { personalInfo } from "@/lib/data";

export default function AboutBrain(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Points>(null);

  // Procedural abstract "brain" using particles in a sphere shape
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    // Create a sphere shape with some noise
    const r = 2 + (Math.random() * 0.5);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <points ref={brainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#7b61ff" transparent opacity={0.6} />
      </points>

      <Html position={[0, 0, 0]} transform distanceFactor={8}>
        <div className="w-[700px] p-10 bg-black/60 backdrop-blur-xl border border-[#7b61ff]/30 rounded-2xl shadow-[0_0_30px_rgba(123,97,255,0.2)] text-white">
          <h2 className="text-4xl font-bold text-[#7b61ff] mb-6">The Mindset</h2>
          <p className="text-lg leading-relaxed opacity-90">
            {personalInfo.summary}
          </p>
        </div>
      </Html>
    </group>
  );
}
