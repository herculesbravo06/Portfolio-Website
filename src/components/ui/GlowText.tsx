"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  gradient?: boolean;
}

export default function GlowText({
  text,
  className,
  as: Component = "span",
  gradient = true,
}: GlowTextProps) {
  return (
    <Component
      className={cn(
        gradient ? "gradient-text" : "text-[var(--color-primary)]",
        "glow-text",
        className
      )}
    >
      {text}
    </Component>
  );
}

// Animated text that reveals word by word
export function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
