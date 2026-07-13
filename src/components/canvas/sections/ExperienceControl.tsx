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
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Decorative curved screen background */}
      <mesh position={[0, 0, -2]}>
        <cylinderGeometry args={[8, 8, 4, 32, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]} />
        <meshStandardMaterial color="#00d4ff" wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[0, 4, 0]} transform center distanceFactor={8}>
        <div className="text-4xl font-bold text-white tracking-widest text-shadow-glow">MISSION CONTROL</div>
      </Html>

      {/* Experience Panels */}
      {experiences.map((exp, index) => {
        const x = (index - 1) * 6; // Spread horizontally
        const z = Math.abs(index - 1) * 2; // Curve inwards
        const rotY = (index - 1) * -0.2; // Curve rotation
        
        return (
          <group key={index} position={[x, 0, z]} rotation={[0, rotY, 0]}>
            <Html transform center distanceFactor={6}>
              <div className="w-[450px] p-6 glass bg-black/60 backdrop-blur-xl border-l-4 border-l-[#00d4ff] rounded-r-xl text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#00d4ff]">{exp.title}</h3>
                    <p className="text-gray-300 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.description.slice(0, 2).map((desc, i) => (
                    <li key={i} className="text-sm opacity-80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#00d4ff] before:rounded-full">
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.keySkills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
