"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/lib/store";
import HeroScene from "./HeroScene";
import WorldScene from "./WorldScene";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicExperience() {
  const bootState = useAppStore((state) => state.bootState);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative w-full h-[1000vh]">
      {/* 
        This div provides the physical scroll height (1000vh). 
        The canvas is fixed to the viewport.
      */}
      <div className="fixed inset-0 w-full h-full pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]} // limit dpr for performance
        >
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            
            {bootState !== "world" && (
              <Physics gravity={[0, 0, 0]}>
                <HeroScene />
              </Physics>
            )}
            
            <WorldScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
