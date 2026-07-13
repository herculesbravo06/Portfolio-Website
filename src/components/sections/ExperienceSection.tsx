"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding section-alt-bg relative overflow-hidden">
      {/* Command center grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[var(--color-secondary)] opacity-[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="05"
          title="Experience"
          subtitle="Mission logs from the command center"
        />

        {/* Mission Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <GlassCard className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3 text-[var(--color-primary)] font-medium">
                      <Briefcase size={16} />
                      <span className="text-lg">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] px-4 py-2 rounded-full border border-[var(--color-border)]">
                      <Calendar size={14} />
                      <span className="font-mono tracking-wide">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-bg)] rounded-full border border-[var(--color-border)]">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          exp.status === "active"
                            ? "bg-[var(--color-accent)] animate-pulse"
                            : "bg-[var(--color-text-dim)]"
                        }`}
                      />
                      <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
                        {exp.status === "active" ? "ACTIVE" : "COMPLETED"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-4 mb-8">
                  {exp.description.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.08 }}
                      className="flex items-start gap-4 text-sm text-[var(--color-text-muted)] leading-relaxed"
                    >
                      <span className="text-[var(--color-primary)] mt-1 text-sm shrink-0">
                        ▸
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Key Skills */}
                <div className="flex flex-wrap gap-3">
                  {exp.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 rounded-full text-xs font-mono border border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 cursor-hover bg-[var(--color-surface)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 h-px bg-gradient-to-r from-[var(--color-primary)]/30 via-[var(--color-secondary)]/10 to-transparent" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
