"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function HeroSection() {
  const mouse = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    );
  }, []);

  // Grid lines for bg
  const gridLines = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        isVertical: i >= 10,
        position: (i % 10) * 10 + 5,
      })),
    []
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + mouse.normalizedX * 15}% ${50 + mouse.normalizedY * 15}%, rgba(0, 212, 255, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at ${70 - mouse.normalizedX * 10}% ${30 - mouse.normalizedY * 10}%, rgba(123, 97, 255, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 80%, rgba(0, 255, 136, 0.02) 0%, transparent 40%)
          `,
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        {gridLines.map((line) =>
          line.isVertical ? (
            <div
              key={line.id}
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${line.position}%` }}
            />
          ) : (
            <div
              key={line.id}
              className="absolute left-0 right-0 h-px bg-white"
              style={{ top: `${line.position}%` }}
            />
          )
        )}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: `rgba(0, 212, 255, ${p.opacity})`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mb-4"
        >
          <span className="font-mono text-sm text-[var(--color-primary)] tracking-widest uppercase">
            Welcome to my universe
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
          style={{
            transform: `translate(${mouse.normalizedX * 5}px, ${mouse.normalizedY * 5}px)`,
          }}
        >
          <span className="block text-[var(--color-text)]">Hi. I&apos;m</span>
          <span className="block gradient-text glow-text mt-2">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Tagline with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-text-muted)] leading-relaxed font-light">
            Building Intelligent Solutions Through{" "}
            <span className="text-[var(--color-primary)]">
              Artificial Intelligence
            </span>
            ,{" "}
            <span className="text-[var(--color-secondary)]">Data Analytics</span>{" "}
            &{" "}
            <span className="text-[var(--color-accent)]">
              Business Intelligence
            </span>
            .
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium text-sm hover:shadow-[0_0_30px_var(--color-glow-primary)] transition-shadow duration-300 cursor-hover"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full border border-[var(--color-border)] text-[var(--color-text)] font-medium text-sm hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_var(--color-glow-primary)] transition-all duration-300 glass cursor-hover"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--color-text-dim)] font-mono tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-[var(--color-primary)]" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[var(--color-border)] opacity-20 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[var(--color-border)] opacity-20 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[var(--color-border)] opacity-20 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[var(--color-border)] opacity-20 rounded-br-lg" />
    </section>
  );
}
