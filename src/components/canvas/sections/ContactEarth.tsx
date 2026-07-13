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

      {/* Contact Form Panel */}
      <Html position={[3, 0, 0]} transform center distanceFactor={8}>
        <div className="w-[500px] p-8 glass bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl text-white">
          <h2 className="text-3xl font-bold mb-2">Establish Connection</h2>
          <p className="text-gray-400 text-sm mb-6">Transmit signal to coordinates: {personalInfo.location}</p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Signal ID (Name)</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Return Frequency (Email)</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Payload (Message)</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"></textarea>
            </div>
            <button className="w-full bg-[#00d4ff] text-black font-bold py-3 rounded hover:bg-white hover:text-black transition-all duration-300 tracking-widest">
              TRANSMIT
            </button>
          </form>

          <div className="mt-6 flex justify-center gap-4">
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00d4ff] transition-colors">LinkedIn</a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#00d4ff] transition-colors">GitHub</a>
            <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-[#00d4ff] transition-colors">Email</a>
          </div>
        </div>
      </Html>
    </group>
  );
}
