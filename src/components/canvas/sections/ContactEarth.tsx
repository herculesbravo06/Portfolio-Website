"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { personalInfo } from "@/lib/data";

export default function ContactEarth(props: any) {
  const earthRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
      earthRef.current.rotation.x += 0.002;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.001;
    }
  });

  return (
    <group {...props}>
      {/* Earth Sphere */}
      <mesh ref={earthRef} position={[-4, 0, 0]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#0055ff" wireframe transparent opacity={0.3} />
        
        {/* Core glow */}
        <mesh>
          <sphereGeometry args={[3.8, 16, 16]} />
          <meshBasicMaterial color="#001133" />
        </mesh>
      </mesh>

      {/* Satellite Ring */}
      <mesh ref={ringRef} position={[-4, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
        
        {/* Satellites */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 6, Math.sin(angle) * 6, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </mesh>
    </group>
  );
}
