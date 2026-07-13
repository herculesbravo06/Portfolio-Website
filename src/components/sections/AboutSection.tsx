"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const brainRegions = [
  { label: "Education", x: "25%", y: "20%", color: "#00d4ff", delay: 0.1, description: "BSc Computer Science • MSc AI & Data Analytics" },
  { label: "Experience", x: "75%", y: "25%", color: "#7b61ff", delay: 0.2, description: "Founder's Office • Research • Strategy" },
  { label: "Technical Skills", x: "20%", y: "55%", color: "#00ff88", delay: 0.3, description: "Python • AI/ML • Data Analytics • Business Intelligence" },
  { label: "Vision", x: "80%", y: "60%", color: "#ff6b9d", delay: 0.4, description: "Building intelligent solutions for real-world impact" },
  { label: "Problem Solving", x: "35%", y: "80%", color: "#ffa726", delay: 0.5, description: "Data-driven decisions • Analytical thinking" },
  { label: "Business Thinking", x: "65%", y: "85%", color: "#26c6da", delay: 0.6, description: "Strategic planning • Operational excellence" },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] opacity-[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secondary)] opacity-[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="01"
          title="About"
          subtitle="Mapping the neural pathways of an AI professional"
        />

        {/* Brain Visualization */}
        <div className="relative w-full max-w-6xl mx-auto aspect-square md:aspect-[16/10]">
          {/* Central brain SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Brain outline - abstract neural network */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full max-w-xl opacity-10"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="0.5"
            >
              {/* Neural network paths */}
              <motion.circle cx="200" cy="150" r="80" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
              <motion.circle cx="200" cy="150" r="120" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.3 }} />
              <motion.circle cx="200" cy="150" r="50" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.1 }} />
              {/* Connection lines */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.line
                    key={i}
                    x1={200 + 50 * Math.cos(rad)}
                    y1={150 + 50 * Math.sin(rad)}
                    x2={200 + 120 * Math.cos(rad)}
                    y2={150 + 120 * Math.sin(rad)}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Brain region nodes */}
          {brainRegions.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: region.delay + 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute group cursor-hover"
              style={{
                left: region.x,
                top: region.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: region.color,
                  opacity: 0.1,
                  animationDuration: "3s",
                }}
              />

              {/* Node */}
              <div
                className="relative w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-150"
                style={{
                  backgroundColor: region.color,
                  boxShadow: `0 0 20px ${region.color}40`,
                }}
              />

              {/* Label */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap">
                <span
                  className="text-xs font-medium block"
                  style={{ color: region.color }}
                >
                  {region.label}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 block max-w-48">
                  {region.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <ScrollRevealText
            text={personalInfo.summary.split(". ").slice(0, 3).join(". ") + "."}
            className="text-lg md:text-xl text-[var(--color-text-muted)] font-light leading-[1.8]"
          />
          <ScrollRevealText
            text={personalInfo.summary.split(". ").slice(3).join(". ")}
            className="mt-8 text-base text-[var(--color-text-dim)] leading-[1.8]"
          />
        </motion.div>
      </div>
    </section>
  );
}
