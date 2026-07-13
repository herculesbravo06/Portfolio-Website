"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { technicalSkills } from "@/lib/data";

export default function SkillsPlanets(props: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Central "Sun" */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} wireframe />
        <Html position={[0, -2.5, 0]} transform center distanceFactor={8}>
          <div className="text-3xl font-bold text-white tracking-widest text-shadow-glow">SKILLS</div>
        </Html>
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
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      const time = state.clock.elapsedTime * speed;
      const angle = startAngle + time;
      
      planetRef.current.position.x = Math.cos(angle) * radius;
      planetRef.current.position.z = Math.sin(angle) * radius;
      planetRef.current.rotation.y += 0.01;
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
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color={category.color} metalness={0.5} roughness={0.2} />
        </mesh>
        
        <Html position={[0, 1.2, 0]} transform center distanceFactor={6}>
          <div 
            className="flex flex-col items-center p-2 rounded-lg bg-black/80 backdrop-blur-md border"
            style={{ borderColor: category.color }}
          >
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="text-sm font-bold text-white whitespace-nowrap">{category.name}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
