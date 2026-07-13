"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Python", icon: "🐍" },
  { name: "Node.js", icon: "🟩" },
  { name: "Three.js", icon: "🧊" },
  { name: "Tailwind", icon: "🌊" },
  { name: "GSAP", icon: "🟢" },
  { name: "Framer Motion", icon: "🟣" },
  { name: "SQL", icon: "🗄️" },
  { name: "PowerBI", icon: "📊" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[var(--color-surface)] py-4 border-y border-[var(--color-border)] mt-12">
      <div className="flex gap-8 whitespace-nowrap mask-edges">
        {/* We duplicate the array to create an infinite scrolling effect */}
        <motion.div
          animate={{ x: [0, -1035] }} // Adjust duration or distance based on content width
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
          className="flex items-center gap-8 min-w-max"
        >
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-sm font-mono text-[var(--color-text-dim)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <span>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
