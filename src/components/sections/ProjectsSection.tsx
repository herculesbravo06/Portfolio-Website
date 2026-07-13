"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { projects, type Project } from "@/lib/data";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <GlassCard
        onClick={onOpen}
        className="group p-8 h-full transition-all duration-500 hover:scale-[1.02]"
      >
        {/* Project number & icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-[var(--color-text-dim)]">
            PROJECT.{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-3xl">{project.icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-primary)] font-medium mb-4">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techHighlights.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-[10px] font-mono border border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-surface)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium group-hover:gap-3 transition-all duration-300">
          <span>View Case Study</span>
          <ArrowRight size={14} />
        </div>

        {/* Bottom gradient border */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        />
      </GlassCard>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass p-8 md:p-12 rounded-3xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors cursor-hover"
        >
          <X size={20} className="text-[var(--color-text-muted)]" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{project.icon}</span>
          <div>
            <h3 className="text-3xl font-bold gradient-text">{project.title}</h3>
            <p className="text-[var(--color-primary)] font-medium mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-mono text-[var(--color-accent)] mb-3 uppercase tracking-wider">
              Overview
            </h4>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-mono text-[var(--color-accent)] mb-3 uppercase tracking-wider">
              Key Features
            </h4>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-[var(--color-text-muted)]"
                >
                  <span className="text-[var(--color-primary)] mt-1.5 text-xs">▸</span>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono text-[var(--color-accent)] mb-3 uppercase tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techHighlights.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-xs font-mono border border-[var(--color-primary)]/20 text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding section-alt-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="container-main relative z-10">
        <SectionHeading
          number="03"
          title="Projects"
          subtitle="AI-powered solutions solving real-world problems"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
