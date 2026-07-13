"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function TerminalUI() {
  const setBootState = useAppStore((state) => state.setBootState);
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const startupLines = [
    "Initializing Portfolio Environment...",
    "Loading AI Modules...",
    "Connecting Neural Engine...",
    "Access Granted.",
    "",
    "Type 'help' to initialize the experience."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < startupLines.length) {
        setLines((prev) => [...prev, startupLines[currentLine]]);
        currentLine++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmd: string) => {
    if (cmd.trim().toLowerCase() === "help") {
      setLines((prev) => [...prev, "> help", "Initiating system override..."]);
      setTimeout(() => {
        setBootState("exploding");
        setTimeout(() => setBootState("world"), 2000); // Transition to world state after explosion
      }, 1000);
    } else {
      setLines((prev) => [...prev, `> ${cmd}`, "Command not recognized. Type 'help'."]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input);
    }
  };

  return (
    <div className="w-[800px] h-[600px] bg-black/90 text-[#00d4ff] p-8 font-mono border-2 border-[#00d4ff]/30 rounded-lg shadow-[0_0_30px_rgba(0,212,255,0.2)] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="text-xl">
            {line}
          </div>
        ))}
        {!isTyping && (
          <div className="flex items-center text-xl mt-4">
            <span className="mr-2">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-transparent border-none outline-none text-[#00d4ff] flex-1"
            />
          </div>
        )}
      </div>
      
      {/* Fallback button for users who don't want to type */}
      {!isTyping && (
        <button
          onClick={() => handleCommand("help")}
          className="mt-4 px-4 py-2 bg-[#00d4ff]/20 hover:bg-[#00d4ff]/40 border border-[#00d4ff] rounded text-lg transition-colors"
        >
          [ CLICK HERE TO INITIALIZE ]
        </button>
      )}
    </div>
  );
}
