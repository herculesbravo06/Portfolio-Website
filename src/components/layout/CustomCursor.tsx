"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  const dotScale = useMotionValue(1);
  const ringScale = useMotionValue(1);
  const springDotScale = useSpring(dotScale, { damping: 15, stiffness: 300 });
  const springRingScale = useSpring(ringScale, { damping: 15, stiffness: 300 });

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      dotScale.set(0.8);
      ringScale.set(0.8);
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      dotScale.set(isHovering.current ? 1.5 : 1);
      ringScale.set(isHovering.current ? 1.5 : 1);
    };

    const handleMouseEnterInteractive = () => {
      isHovering.current = true;
      dotScale.set(1.5);
      ringScale.set(1.5);
    };

    const handleMouseLeaveInteractive = () => {
      isHovering.current = false;
      dotScale.set(1);
      ringScale.set(1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to all interactive elements
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-hover'
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, dotScale, ringScale]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          scale: springDotScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          scale: springRingScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-10 h-10 rounded-full border border-[var(--color-primary)]"
          style={{ opacity: 0.4 }}
        />
      </motion.div>
    </>
  );
}
