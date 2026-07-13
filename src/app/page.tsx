"use client";

import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import LoadingScreen from "@/components/layout/LoadingScreen";

import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import the main 3D scene to avoid SSR issues with Three.js
const CinematicExperience = dynamic(
  () => import("@/components/canvas/CinematicExperience"),
  { ssr: false }
);

export default function Home() {
  const bootState = useAppStore((state) => state.bootState);
  const setBootState = useAppStore((state) => state.setBootState);

  return (
    <main className="relative w-full bg-black text-white">
      {bootState === "booting" && (
        <LoadingScreen onComplete={() => setBootState("terminal")} />
      )}
      
      {bootState !== "booting" && (
        <CinematicExperience />
      )}

      {/* 2D DOM Content - Only visible after terminal explosion */}
      <div 
        className={`relative z-10 w-full transition-opacity duration-1000 ${bootState === 'world' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}
