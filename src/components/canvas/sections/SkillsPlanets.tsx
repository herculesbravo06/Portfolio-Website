"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { technicalSkills } from "@/lib/data";

export default function SkillsPlanets(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group {...props}>
      {/* Central "Sun" */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} wireframe />
      </mesh>

      {/* Orbiting Planets for each category */}
      {technicalSkills.map((category, index) => {
        const radius = 4 + index * 2;
        const speed = 0.5 - (index * 0.05);
        
        return (
          <Planet 
            key={category.name} 
            category={category} 
            radius={radius} 
            speed={speed} 
            startAngle={(Math.PI * 2 / technicalSkills.length) * index} 
          />
        );
      })}
    </group>
  );
}

function Planet({ category, radius, speed, startAngle }: { category: any, radius: number, speed: number, startAngle: number }) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      const time = state.clock.elapsedTime * speed;
      const angle = startAngle + time;
      
      // Move the group in a circle
      planetRef.current.position.x = Math.cos(angle) * radius;
      planetRef.current.position.z = Math.sin(angle) * radius;
    }
    
    if (meshRef.current) {
      // Spin the planet itself, but not the HTML
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      {/* Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ringRef}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color={category.color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* The Planet */}
      <group ref={planetRef}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color={category.color} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
