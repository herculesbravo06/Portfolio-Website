"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding section-alt-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--color-accent)] opacity-[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="06"
          title="Certifications"
          subtitle="Validated expertise and continuous learning"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <GlassCard className="p-6 h-full group hover:border-[var(--color-accent)]/20 transition-colors duration-500">
                {/* Badge icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-accent)]/20 group-hover:shadow-[0_0_20px_var(--color-glow-accent)] transition-shadow duration-500">
                    <Award size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="text-2xl">{cert.icon}</span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-[var(--color-primary)] mb-3">
                  {cert.institution}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {cert.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
