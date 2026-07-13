"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TechMarquee from "@/components/ui/TechMarquee";
import { technicalSkills, softwareTools, professionalSkills, type SkillCategory } from "@/lib/data";

function SkillPlanet({
  skill,
  index,
  total,
}: {
  skill: SkillCategory;
  index: number;
  total: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate position in orbital layout
  const angle = (index / total) * 360;
  const radius = 38; // percentage from center

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 200,
      }}
      className="absolute cursor-hover"
      style={{
        left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
        top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Planet body */}
      <motion.div
        animate={{ scale: isExpanded ? 1.3 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Orbit ring */}
        <div
          className="absolute inset-[-12px] rounded-full border opacity-20"
          style={{ borderColor: skill.color }}
        />

        {/* Planet */}
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center relative z-10"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${skill.color}30, ${skill.color}10)`,
            border: `1px solid ${skill.color}40`,
            boxShadow: `0 0 30px ${skill.color}20, inset 0 0 20px ${skill.color}10`,
          }}
        >
          <span className="text-xl md:text-2xl">{skill.icon}</span>
          <span className="text-[8px] md:text-[10px] font-mono font-medium mt-0.5" style={{ color: skill.color }}>
            {skill.name.length > 10 ? skill.name.split(" ")[0] : skill.name}
          </span>
        </div>

        {/* Expanded sub-skills */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
            >
              <div
                className="glass p-4 rounded-xl min-w-48 max-w-64"
                style={{
                  borderColor: `${skill.color}30`,
                  boxShadow: `0 0 30px ${skill.color}15`,
                }}
              >
                <h4
                  className="text-xs font-mono font-bold mb-2"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skill.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-2 py-1 rounded-md text-[10px] font-mono"
                      style={{
                        backgroundColor: `${skill.color}10`,
                        color: `${skill.color}cc`,
                        border: `1px solid ${skill.color}20`,
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--color-border)] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--color-border)] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[var(--color-border)] opacity-5" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="04"
          title="Skills"
          subtitle="A universe of capabilities orbiting around intelligence"
          align="center"
        />

        {/* Orbital System - Desktop */}
        <div className="hidden md:block relative w-full max-w-3xl mx-auto aspect-square mb-20">
          {/* Central sun */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-[0_0_60px_var(--color-glow-primary)]">
              <span className="text-3xl">🧠</span>
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[var(--color-text-muted)] whitespace-nowrap">
              CORE.INTELLIGENCE
            </span>
          </motion.div>

          {/* Orbit rings */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            className="absolute inset-[15%] rounded-full border border-dashed border-[var(--color-primary)]"
          />

          {/* Planets */}
          {technicalSkills.map((skill, i) => (
            <SkillPlanet
              key={skill.name}
              skill={skill}
              index={i}
              total={technicalSkills.length}
            />
          ))}
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-16">
          {technicalSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-xl"
              style={{ borderColor: `${skill.color}20` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{skill.icon}</span>
                <span className="text-xs font-mono font-medium" style={{ color: skill.color }}>
                  {skill.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skill.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[9px] font-mono"
                    style={{
                      backgroundColor: `${skill.color}10`,
                      color: `${skill.color}aa`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Software Tools */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-mono text-sm text-[var(--color-primary)] mb-6 text-center">
            SOFTWARE & TOOLS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(softwareTools).map(([category, tools], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-subtle p-4 rounded-xl"
              >
                <span className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider block mb-2">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 w-full mx-auto text-center"
        >
          <h3 className="font-mono text-sm text-[var(--color-secondary)] mb-6">
            PROFESSIONAL SKILLS
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {professionalSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full text-xs border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-all duration-300 cursor-hover"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee for tools/tech icons */}
      <TechMarquee />
    </section>
  );
}
