"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { terminalCommands } from "@/lib/data";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", content: "HARIN.AI Terminal v1.0.0" },
    { type: "system", content: "Type 'help' to see available commands." },
    { type: "system", content: "" },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    // Add to history
    setHistory((prev) => [
      ...prev,
      { type: "input", content: `visitor@harin.ai:~$ ${cmd}` },
    ]);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([
        { type: "system", content: "HARIN.AI Terminal v1.0.0" },
        { type: "system", content: "Terminal cleared. Type 'help' for commands." },
        { type: "system", content: "" },
      ]);
      setInput("");
      return;
    }

    // Simulate typing delay
    setTimeout(() => {
      const response = terminalCommands[trimmed];
      if (response) {
        setHistory((prev) => [
          ...prev,
          { type: "output", content: response },
          { type: "system", content: "" },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
          },
          { type: "system", content: "" },
        ]);
      }
    }, 200);

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="terminal" className="section-padding section-alt-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-[0.01] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="09"
          title="Terminal"
          subtitle="Interact with the AI system directly"
          align="center"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-dim)] font-mono">
                <Terminal size={12} />
                <span>harin.ai — Terminal</span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-5 h-[400px] overflow-y-auto font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap mb-1 ${
                    line.type === "input"
                      ? "text-[var(--color-accent)]"
                      : line.type === "system"
                      ? "text-[var(--color-text-dim)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {line.content}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] shrink-0">
                  visitor@harin.ai:~$
                </span>
                {mounted && (
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-[var(--color-text)] caret-[var(--color-primary)] font-mono text-sm"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    suppressHydrationWarning
                  />
                )}
                <span className="cursor-blink text-[var(--color-primary)]">█</span>
              </div>
            </div>
          </div>

          {/* Quick commands */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["help", "about", "skills", "projects", "experience", "contact"].map(
              (cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-mono border border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 cursor-hover"
                >
                  {cmd}
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
