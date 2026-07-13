"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  { text: "Initializing AI Portfolio...", delay: 0 },
  { text: "Loading Neural Engine...", delay: 400 },
  { text: "Connecting Intelligence Networks...", delay: 800 },
  { text: "Calibrating Visual Systems...", delay: 1100 },
  { text: "Mounting Data Modules...", delay: 1400 },
  { text: "Access Granted.", delay: 1700 },
];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessages, setCurrentMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show boot messages sequentially
    bootMessages.forEach(({ text, delay }) => {
      setTimeout(() => {
        setCurrentMessages((prev) => [...prev, text]);
      }, delay);
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Hide loading screen
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] bg-[var(--color-bg)] flex items-center justify-center"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="scanline" />
          </div>

          {/* Content */}
          <div className="relative w-full max-w-lg px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_30px_var(--color-glow-primary)]">
                HB
              </div>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                HARIN.BHAVSAR // AI SYSTEM
              </span>
            </motion.div>

            {/* Terminal Messages */}
            <div className="font-mono text-sm space-y-2 mb-8">
              {currentMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[var(--color-accent)]">▸</span>
                  <span
                    className={
                      i === currentMessages.length - 1 && msg === "Access Granted."
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)]"
                    }
                  >
                    {msg}
                  </span>
                  {i === currentMessages.length - 1 && (
                    <span className="cursor-blink text-[var(--color-primary)]">
                      █
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-[var(--color-surface)] rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-[var(--color-text-dim)]">
              <span>SYS.BOOT</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 right-6 font-mono text-[10px] text-[var(--color-text-dim)]">
            v1.0.0
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[var(--color-text-dim)]">
            © 2025 HARIN BHAVSAR
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
