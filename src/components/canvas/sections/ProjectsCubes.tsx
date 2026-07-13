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

      <Html position={[0, -2, 0]} transform center distanceFactor={6}>
        <div 
          className={`transition-all duration-500 w-[400px] p-6 glass rounded-xl border border-white/10 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{project.icon}</span>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">{project.subtitle}</p>
          <div className="flex flex-wrap gap-1">
            {project.techHighlights.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
