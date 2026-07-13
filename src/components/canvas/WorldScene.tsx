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
      
      // We use a small timeout to ensure the 2D DOM sections have rendered
      setTimeout(() => {
        const sectionsConfig = [
          { ref: aboutRef, id: "#about" },
          { ref: skillsRef, id: "#skills" },
          { ref: projectsRef, id: "#projects" },
          { ref: experienceRef, id: "#experience" },
          { ref: contactRef, id: "#contact" },
        ];

        sectionsConfig.forEach(({ ref, id }) => {
          if (!ref.current) return;
          const section = ref.current;
          
          // Initial state: hidden behind
          gsap.set(section.position, { z: -40, y: -5 });
          gsap.set(section.scale, { x: 0.1, y: 0.1, z: 0.1 });
          
          const domElement = document.querySelector(id);
          if (!domElement) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: domElement,
              start: "top bottom", // Trigger when top of 2D section hits bottom of screen
              end: "bottom top",   // End when bottom of 2D section hits top of screen
              scrub: 1,
            }
          })
          // 1. Bring into view as section enters
          .to(section.position, {
            z: -2, // keep slightly behind 2D content
            y: 0,
            duration: 1,
            ease: "power2.out",
          })
          .to(section.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "power2.out",
          }, "<")
          // 2. Stay steady while scrolling through section
          .to(section.position, {
            z: -1.5,
            duration: 0.5,
          })
          // 3. Float back into distance as section leaves
          .to(section.position, {
            z: -40,
            y: 10,
            duration: 1,
            ease: "power2.in",
          })
          .to(section.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            duration: 1,
            ease: "power2.in",
          }, "<");
        });
      }, 100); // 100ms delay to ensure DOM is ready
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
