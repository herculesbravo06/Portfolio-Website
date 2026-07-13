"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/lib/data";

export default function ProjectsCubes(props: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {projects.map((project, index) => {
        // Arrange cubes in a grid or circle
        const x = (index % 2 === 0 ? -1 : 1) * 4;
        const z = (Math.floor(index / 2) === 0 ? -1 : 1) * 4;
        
        return (
          <ProjectCube 
            key={project.id} 
            project={project} 
            position={[x, 0, z]} 
          />
        );
      })}
    </group>
  );
}

function ProjectCube({ project, position }: { project: any, position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Pulse scale on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Extract primary color from gradient string for wireframe color
  let color = "#00d4ff";
  if (project.gradient.includes("purple")) color = "#a855f7";
  if (project.gradient.includes("emerald")) color = "#10b981";
  if (project.gradient.includes("red")) color = "#ef4444";

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={hovered ? 1 : 0.2} />
      </mesh>
    </group>
  );
}
