"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Navigation from "@/components/layout/Navigation";
import LoadingScreen from "@/components/layout/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import GitHubSection from "@/components/sections/GitHubSection";
import TerminalSection from "@/components/sections/TerminalSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamic import for custom cursor (only on non-touch devices)
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);

// Dynamic import for 3D scene
const IntroScene = dynamic(
  () => import("@/components/canvas/IntroScene"),
  { ssr: false }
);

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="section-divider mx-auto"
      style={{ maxWidth: "80%" }}
    />
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* 3D Global Canvas Layer (Dimmed to prevent visual clashes) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <IntroScene />
      </div>

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main Content — Continuous scroll experience */}
      <main className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <JourneyTimeline />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <AchievementsSection />
        <SectionDivider />
        <GitHubSection />
        <SectionDivider />
        <TerminalSection />
        <SectionDivider />
        <ContactSection />
      </main>
    </SmoothScrollProvider>
  );
}
