"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useScroll, ScrollControls } from "@react-three/drei";
import * as THREE from "three";


// We'll build the abstract scene directly in here.
export default function IntroScene() {
  return (
    <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AbstractCharacter />
        <ExplodingKeyboard />
      </Canvas>
    </div>
  );
}

function AbstractCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    // We can link this to the window scroll manually
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / (window.innerHeight * 1.5), 1); // Normalize to first 1.5 screens
    
    if (groupRef.current) {
      // Chair rotates as user scrolls
      groupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 2, progress);
      // Move back slightly
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -5, progress);
    }
  });

  return (
    <group ref={groupRef} position={[-2, -1, 0]}>
      {/* Chair Base */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color="var(--color-primary)" wireframe />
      </mesh>
      {/* Head */}
      <mesh position={[0, 2.75, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" wireframe />
      </mesh>
      {/* Desk / Monitor */}
      <mesh position={[0, 1.5, 1.5]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#111" />
        <Html transform position={[0, 0, 0.06]} scale={0.1}>
          <div className="w-64 h-40 bg-black border border-[#00d4ff] flex items-center justify-center rounded-md shadow-[0_0_20px_#00d4ff]">
            <span className="text-[#00d4ff] font-mono text-xl animate-pulse">HARIN.AI OS</span>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function ExplodingKeyboard() {
  const keysRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // 10x4 keyboard layout
  const keyCount = 40;
  
  const keyData = useMemo(() => {
    return Array.from({ length: keyCount }, (_, i) => {
      const col = i % 10;
      const row = Math.floor(i / 10);
      return {
        x: col * 0.3 - 1.5,
        y: row * 0.3,
        z: 0,
        // Random target positions for the explosion
        targetX: (Math.random() - 0.5) * 20,
        targetY: (Math.random() - 0.5) * 20 + 5,
        targetZ: (Math.random() - 0.5) * 20 - 5,
        targetRotX: Math.random() * Math.PI * 4,
        targetRotY: Math.random() * Math.PI * 4,
        targetRotZ: Math.random() * Math.PI * 4,
      };
    });
  }, []);

  useFrame(() => {
    const scrollY = window.scrollY;
    const progress = Math.min(Math.max(scrollY - window.innerHeight, 0) / window.innerHeight, 1);
    
    if (keysRef.current) {
      keyData.forEach((data, i) => {
        // Interpolate between grid position and exploded position based on scroll
        dummy.position.set(
          THREE.MathUtils.lerp(data.x, data.targetX, progress),
          THREE.MathUtils.lerp(data.y, data.targetY, progress),
          THREE.MathUtils.lerp(data.z, data.targetZ, progress)
        );
        
        dummy.rotation.set(
          THREE.MathUtils.lerp(0, data.targetRotX, progress),
          THREE.MathUtils.lerp(0, data.targetRotY, progress),
          THREE.MathUtils.lerp(0, data.targetRotZ, progress)
        );
        
        dummy.updateMatrix();
        keysRef.current!.setMatrixAt(i, dummy.matrix);
      });
      keysRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[2, -1, 1]} rotation={[-Math.PI / 4, 0, 0]}>
      <instancedMesh ref={keysRef} args={[undefined, undefined, keyCount]}>
        <boxGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color="#7b61ff" wireframe />
      </instancedMesh>
    </group>
  );
}
