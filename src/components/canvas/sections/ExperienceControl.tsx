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
      <Html position={[0, 4, 0]} transform center distanceFactor={8}>
        <div className="text-4xl font-bold text-white tracking-widest text-shadow-glow">MISSION CONTROL</div>
      </Html>

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
            <Html transform center distanceFactor={6}>
              <div className="w-[550px] p-8 glass bg-black/60 backdrop-blur-xl border-l-4 border-l-[#00d4ff] rounded-r-xl text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#00d4ff] mb-1">{exp.title}</h3>
                    <p className="text-lg text-gray-300 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-gray-300 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
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
    </group>
  );
}
