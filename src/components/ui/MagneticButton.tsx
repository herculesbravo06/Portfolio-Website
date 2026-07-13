"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      <Component
        href={href}
        target={target}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3",
          "rounded-full border border-[var(--glass-border)]",
          "bg-[var(--glass-bg)] backdrop-blur-lg",
          "text-[var(--color-text)] font-medium text-sm",
          "transition-all duration-300",
          "hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_var(--color-glow-primary)]",
          "active:scale-95",
          "cursor-hover",
          className
        )}
      >
        {children}
      </Component>
    </motion.div>
  );
}
