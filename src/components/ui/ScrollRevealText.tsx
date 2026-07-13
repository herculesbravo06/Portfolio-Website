"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={cn("flex flex-wrap text-justify", className)}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: any;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mt-1">
      <motion.span style={{ opacity }}>{children}</motion.span>
      {" "}
    </span>
  );
};
