"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";
import TerminalUI from "../ui/TerminalUI";

export default function HeroScene() {
  const bootState = useAppStore((state) => state.bootState);

  // Monitor frame (physics body)
  const [monitorRef, monitorApi] = useBox(() => ({
    mass: 0,
    position: [0, 1, -2],
    args: [4, 3, 0.2],
  })) as any;

  // Keyboard body (physics body)
  const [keyboardRef, keyboardApi] = useBox(() => ({
    mass: 0,
    position: [0, -1, 1],
    rotation: [-0.2, 0, 0],
    args: [3, 0.1, 1],
  })) as any;

  // Trigger explosion physics when bootState changes to exploding
  useEffect(() => {
    if (bootState === "exploding") {
      // Set mass to make them dynamic
      monitorApi.mass.set(5);
      keyboardApi.mass.set(3);
      
      // Apply explosive forces
      monitorApi.applyImpulse([0, 10, -5], [0, 0, 0]);
      monitorApi.applyTorque([5, 5, 5]);

      keyboardApi.applyImpulse([0, 5, 5], [0, 0, 0]);
      keyboardApi.applyTorque([-5, 10, 2]);
    }
  }, [bootState, monitorApi, keyboardApi]);

  return (
    <group>
      {/* Lights */}
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#00d4ff" />
      <spotLight position={[-5, 5, -5]} angle={0.5} penumbra={1} intensity={1} color="#7b61ff" />

      {/* Monitor */}
      <mesh ref={monitorRef}>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        
        {/* Terminal Screen (Embedded HTML) */}
        {bootState !== "exploding" && (
          <Html
            transform
            position={[0, 0, 0.11]}
            scale={0.1}
          >
            <TerminalUI />
          </Html>
        )}
      </mesh>

      {/* Keyboard Base */}
      <mesh ref={keyboardRef}>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Particles/Dust */}
      <DustParticles />
    </group>
  );
}

function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random particles
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
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
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.4} />
    </points>
  );
}
