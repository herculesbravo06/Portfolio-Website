"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Star, Code2, GitCommit, ExternalLink, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Circular progress ring
function ScoreRing({ score, label }: { score: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth="8"
          />
          {/* Progress ring */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold gradient-text">
            <AnimatedCounter value={score} />
          </span>
          <span className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
            Score
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}

export default function GitHubSection() {
  const [stats] = useState<GitHubStats>({
    publicRepos: 12,
    followers: 8,
    following: 15,
    stars: 24,
    topLanguages: [
      { name: "Python", percentage: 45, color: "#3572A5" },
      { name: "JavaScript", percentage: 25, color: "#f1e05a" },
      { name: "TypeScript", percentage: 15, color: "#3178c6" },
      { name: "PHP", percentage: 10, color: "#4F5D95" },
      { name: "SQL", percentage: 5, color: "#e38c00" },
    ],
  });

  return (
    <section id="github" className="section-padding section-alt-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-main relative z-10">
        <SectionHeading
          number="08"
          title="GitHub"
          subtitle="Open source contributions and code activity"
          align="center"
        />

        {/* Main layout: Score + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Profile Score Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 flex justify-center items-center"
          >
            <GlassCard className="p-8 w-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-6">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-[var(--color-text)]">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="text-sm font-medium text-[var(--color-text)]">Profile Score</span>
              </div>
              <ScoreRing score={78} label="Developer Activity" />
              <a
                href="https://github.com/harinbhavsar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors cursor-hover"
              >
                <span>View Profile</span>
                <ExternalLink size={12} />
              </a>
            </GlassCard>
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              { label: "Repositories", value: stats.publicRepos, icon: Code2, color: "var(--color-primary)" },
              { label: "Followers", value: stats.followers, icon: GitBranch, color: "var(--color-secondary)" },
              { label: "Following", value: stats.following, icon: GitCommit, color: "var(--color-accent)" },
              { label: "Stars Earned", value: stats.stars, icon: Star, color: "var(--color-warning)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${stat.color} 25%, transparent)`,
                      }}
                    >
                      <stat.icon size={18} style={{ color: stat.color }} />
                    </div>
                    <TrendingUp size={14} className="text-[var(--color-accent)] opacity-50" />
                  </div>
                  <span className="text-3xl font-bold gradient-text block mb-1">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
                    {stat.label}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Languages — Individual Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Code2 size={16} className="text-[var(--color-primary)]" />
                <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                  Top Languages
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--color-text-dim)]">
                Based on repository analysis
              </span>
            </div>

            <div className="space-y-5">
              {stats.topLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-medium" style={{ color: lang.color }}>
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--color-surface)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full rounded-full relative"
                      style={{
                        backgroundColor: lang.color,
                        boxShadow: `0 0 10px ${lang.color}40`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full opacity-50"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${lang.color}60, transparent)`,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
