"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "@/lib/data";

export default function ExperienceControl(props: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Float up and down slightly
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      // Revolve based on scroll position!
      groupRef.current.rotation.y = window.scrollY * 0.002;
    }
  });

  return (
    <group {...props}>
      <group ref={groupRef}>
        {/* Experience Cards positioned in a cylinder */}
        {experiences.map((exp, index) => {
        const radius = 8;
        const angle = (index / experiences.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotY = angle; // Face outwards
        
        return (
          <group key={index} position={[x, 0, z]} rotation={[0, rotY, 0]}>
            <mesh>
              <boxGeometry args={[4, 3, 0.1]} />
              <meshStandardMaterial color="#00d4ff" transparent opacity={0.1} wireframe />
            </mesh>
          </group>
        );
      })}
      </group>
    </group>
  );
}
