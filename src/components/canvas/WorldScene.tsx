"use client";

import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";
import gsap from "gsap";

import AboutBrain from "./sections/AboutBrain";
import SkillsPlanets from "./sections/SkillsPlanets";
import ProjectsCubes from "./sections/ProjectsCubes";
import ExperienceControl from "./sections/ExperienceControl";
import ContactEarth from "./sections/ContactEarth";

export default function WorldScene() {
  const bootState = useAppStore((state) => state.bootState);
  const { camera } = useThree();
  
  // The world scene is only visible once we transition past the hero screen
  const isVisible = bootState === "exploding" || bootState === "world";

  // Use a ref to group the sections
  const sectionsGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (bootState === "world") {
      // Set up ScrollTrigger to move the camera down the Z and Y axis as user scrolls
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        }
      });

      // Camera flies down through the space, looking at the sections
      tl.to(camera.position, {
        y: -120,
        z: -30,
        ease: "none",
      });
    }
  }, [bootState, camera]);

  if (!isVisible) return null;

  return (
    <group ref={sectionsGroupRef} position={[0, -10, -5]}>
      
      <AboutBrain position={[0, -5, 0]} />
      
      <SkillsPlanets position={[0, -30, -5]} />
      
      <ProjectsCubes position={[0, -60, -10]} />
      
      <ExperienceControl position={[0, -90, -15]} />
      
      <ContactEarth position={[0, -120, -20]} />
      
    </group>
  );
}
