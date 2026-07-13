"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const timelineNodes = [
  {
    year: "2019",
    title: "Secondary Education",
    subtitle: "Swastik School",
    description: "Built the foundation of academic excellence and curiosity for technology.",
    icon: "🏫",
    color: "#00d4ff",
  },
  {
    year: "2021",
    title: "Higher Secondary",
    subtitle: "Mangaldeep Vidhyalya",
    description: "Explored the world of science and mathematics, sparking interest in computing.",
    icon: "🎓",
    color: "#7b61ff",
  },
  {
    year: "2021 – 2024",
    title: "BSc Computer Science",
    subtitle: "St Xavier's College",
    description: "Deep dive into programming, algorithms, and software development. First exposure to AI and data science.",
    icon: "💻",
    color: "#00ff88",
  },
  {
    year: "2021",
    title: "Social Media Intern",
    subtitle: "Media Solace",
    description: "First professional experience in digital marketing, content strategy, and brand communication.",
    icon: "📱",
    color: "#ff6b9d",
  },
  {
    year: "2021 – 2022",
    title: "Research Intern",
    subtitle: "Media Solace",
    description: "Conducted market research, competitive analysis, and business intelligence reporting.",
    icon: "🔬",
    color: "#ffa726",
  },
  {
    year: "2024 – 2025",
    title: "Founder's Office",
    subtitle: "Media Solace | Upfuse Network",
    description: "Executive Assistant to the Managing Director. Strategic planning, cross-functional leadership, and business operations.",
    icon: "👔",
    color: "#26c6da",
  },
  {
    year: "2025 – Present",
    title: "MSc IT (AI & Data Analytics)",
    subtitle: "GLS University",
    description: "Specializing in Artificial Intelligence and Data Analytics. Building production-grade AI applications.",
    icon: "🤖",
    color: "#00d4ff",
  },
  {
    year: "Ongoing",
    title: "AI Projects",
    subtitle: "VibeUp • VendorBridge AI • FairyFelt • My Buddy",
    description: "Building intelligent solutions across interior design, vendor management, mobility, and emergency response.",
    icon: "🚀",
    color: "#7b61ff",
  },
  {
    year: "Future",
    title: "What's Next?",
    subtitle: "The Journey Continues",
    description: "Contributing to forward-thinking teams creating cutting-edge AI solutions for sustainable growth and real-world impact.",
    icon: "✨",
    color: "#00ff88",
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent opacity-20" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="02"
          title="Journey"
          subtitle="The evolution from curiosity to creation"
          align="center"
        />

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: "linear-gradient(to bottom, var(--color-primary), var(--color-secondary), var(--color-accent))",
            }}
          />

          {/* Nodes */}
          <div className="space-y-12 md:space-y-16">
            {timelineNodes.map((node, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-16" : "md:pl-16"} pl-12 md:pl-0`}>
                    <GlassCard className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{node.icon}</span>
                        <div>
                          <span
                            className="font-mono text-sm font-medium tracking-wider"
                            style={{ color: node.color }}
                          >
                            {node.year}
                          </span>
                          <h3 className="text-xl font-bold text-[var(--color-text)] mt-1">
                            {node.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-base text-[var(--color-primary)] mb-4 font-medium tracking-wide">
                        {node.subtitle}
                      </p>
                      <ScrollRevealText 
                        text={node.description} 
                        className="text-sm md:text-base text-[var(--color-text-muted)] leading-[1.8]"
                      />
                    </GlassCard>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        borderColor: node.color,
                        backgroundColor: "var(--color-bg)",
                        boxShadow: `0 0 15px ${node.color}40`,
                      }}
                    />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
