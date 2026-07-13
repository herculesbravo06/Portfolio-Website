"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootSequence = [
  "BIOS Version 2.10.12 ... OK",
  "Initializing GPU ... OK",
  "Allocating Memory ... 64GB ... OK",
  "Loading Neural Engine ... OK",
  "Checking Security Modules ... OK",
  "Loading AI Models ... OK",
  "Booting HARIN.OS ...",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Play subtle ambient machine sound here if available
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentLine]]);
        currentLine++;
      }
    }, 400);

    // Progress counter
    let currProgress = 0;
    const progressInterval = setInterval(() => {
      currProgress += Math.floor(Math.random() * 5) + 1;
      if (currProgress > 100) currProgress = 100;
      setProgress(currProgress);

      if (currProgress === 100 && currentLine >= bootSequence.length) {
        clearInterval(progressInterval);
        clearInterval(interval);
        
        // Wait 1 second, then complete
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black p-8 font-mono text-sm text-[#00ff88]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="flex-1" />
      <div className="space-y-2 mb-8">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span>Loading AI Environment:</span>
        <span>{progress}%</span>
      </div>
    </motion.div>
  );
}
