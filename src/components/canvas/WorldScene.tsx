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
  
  const isVisible = bootState === "exploding" || bootState === "world";

  // Refs for each section to animate them individually
  const aboutRef = useRef<THREE.Group>(null);
  const skillsRef = useRef<THREE.Group>(null);
  const projectsRef = useRef<THREE.Group>(null);
  const experienceRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (bootState === "world") {
      // Ensure camera is fixed at origin
      camera.position.set(0, 0, 5);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Array of sections in order
      const sections = [
        aboutRef.current,
        skillsRef.current,
        projectsRef.current,
        experienceRef.current,
        contactRef.current
      ];

      // For each section, we create a sequence:
      // 1. Starts far in the background (z: -30) and invisible/small
      // 2. Comes to foreground (z: 0) and stays steady
      // 3. Floats past the camera (z: 10)
      
      sections.forEach((section, index) => {
        if (!section) return;
        
        // Initial state
        gsap.set(section.position, { z: -40, y: -5 });
        gsap.set(section.scale, { x: 0.1, y: 0.1, z: 0.1 });
        
        // 1. Bring into view
        tl.to(section.position, {
          z: 0,
          y: 0,
          duration: 2,
          ease: "power2.out",
        }, index === 0 ? "+=0" : "-=0.5"); // Slight overlap in transition
        
        tl.to(section.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 2,
          ease: "power2.out",
        }, "<");

        // 2. Stay steady (dummy tween to hold position)
        tl.to(section.position, {
          z: 0.5,
          duration: 1,
        });

        // 3. Float back into the distance (backside small thing)
        // Only if it's not the last section
        if (index < sections.length - 1) {
          tl.to(section.position, {
            z: -40,
            y: 10,
            duration: 1.5,
            ease: "power2.in",
          });
          tl.to(section.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            duration: 1.5,
            ease: "power2.in",
          }, "<");
        }
      });
    }
  }, [bootState, camera]);

  if (!isVisible) return null;

  return (
    <group>
      {/* 
        All sections are rendered here but their positions 
        are entirely controlled by the GSAP timeline above. 
        We set initial positions out of view so they don't flash before GSAP kicks in.
      */}
      <group ref={aboutRef} position={[0, -50, -100]}>
        <AboutBrain />
      </group>
      
      <group ref={skillsRef} position={[0, -50, -100]}>
        <SkillsPlanets />
      </group>
      
      <group ref={projectsRef} position={[0, -50, -100]}>
        <ProjectsCubes />
      </group>
      
      <group ref={experienceRef} position={[0, -50, -100]}>
        <ExperienceControl />
      </group>
      
      <group ref={contactRef} position={[0, -50, -100]}>
        <ContactEarth />
      </group>
      
    </group>
  );
}
