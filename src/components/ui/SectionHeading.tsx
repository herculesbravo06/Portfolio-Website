"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "mb-10 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Section number */}
      <div
        className={cn(
          "flex items-center gap-4 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="font-mono text-sm text-[var(--color-primary)] opacity-60">
          {number}
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-[var(--color-primary)] to-transparent opacity-40" />
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "mt-4 text-lg text-[var(--color-text-muted)] max-w-xl font-light",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
