"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Rocket, Crown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { achievements } from "@/lib/data";

const achievementIcons = [Sparkles, Trophy, Rocket, Crown];
const achievementColors = ["#00d4ff", "#ffa726", "#7b61ff", "#00ff88"];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-warning)] opacity-[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="07"
          title="Achievements"
          subtitle="Milestones and recognition along the journey"
          align="center"
        />

        {/* Achievement Cards — 2 column layout with larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, i) => {
            const Icon = achievementIcons[i % achievementIcons.length];
            const color = achievementColors[i % achievementColors.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GlassCard className="p-8 h-full group hover:border-white/10 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-shadow duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                        border: `1px solid ${color}30`,
                        boxShadow: `0 0 0px ${color}00`,
                      }}
                    >
                      <Icon size={24} style={{ color }} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Number badge */}
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block"
                        style={{ color }}
                      >
                        Achievement {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-lg font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {achievement.title}
                      </h3>

                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="mt-6 h-px rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${color}40, transparent)`,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
