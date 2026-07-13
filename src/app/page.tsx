"use client";

import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import LoadingScreen from "@/components/layout/LoadingScreen";

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
    </main>
  );
}
