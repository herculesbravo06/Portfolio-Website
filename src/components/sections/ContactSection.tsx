"use client";

import { useState, FormEvent, SVGProps } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { personalInfo } from "@/lib/data";

// Custom SVG icons for brands not available in lucide-react
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }> | React.ComponentType<SVGProps<SVGSVGElement>>;

const contactMethods: Array<{
  icon: IconComponent;
  label: string;
  value: string;
  href: string;
  color: string;
  external?: boolean;
}> = [
  {
    icon: Phone,
    label: "Call",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    color: "#00ff88",
  },
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#00d4ff",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/harinbhavsar",
    href: personalInfo.linkedin,
    color: "#0A66C2",
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/harinbhavsar",
    href: personalInfo.github,
    color: "#e8e8f0",
    external: true,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-primary)] opacity-[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--color-secondary)] opacity-[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          number="10"
          title="Contact"
          subtitle="Establish a connection"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
          {/* Left - Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare size={20} className="text-[var(--color-primary)]" />
              <span className="text-xs font-mono text-[var(--color-text-dim)] uppercase tracking-wider">
                Get in touch
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Intelligent</span>
            </h3>
            <p className="text-sm md:text-base text-[var(--color-text-muted)] mb-12 leading-relaxed">
              Whether you have a project in mind, want to collaborate on AI
              solutions, or simply want to connect — I&apos;m always open to
              meaningful conversations.
            </p>

            {/* Contact Methods — Vertical list */}
            <div className="space-y-5 mb-12">
              {contactMethods.map((method, i) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex items-center gap-4 p-3.5 rounded-xl glass-subtle hover:border-white/10 transition-all duration-300 cursor-hover"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${method.color}15`,
                      border: `1px solid ${method.color}30`,
                    }}
                  >
                    <method.icon size={18} style={{ color: method.color }} width={18} height={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300 block">
                      {method.label}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-dim)] font-mono truncate block">
                      {method.value}
                    </span>
                  </div>
                  {method.external && (
                    <ExternalLink
                      size={12}
                      className="shrink-0 text-[var(--color-text-dim)] group-hover:text-[var(--color-primary)] transition-colors"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] p-3 rounded-lg bg-[var(--color-surface)]/50 border border-[var(--color-border)]">
              <MapPin size={16} className="text-[var(--color-primary)] shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          </motion.div>

          {/* Right - Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors duration-300 font-mono"
                      placeholder="Your name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors duration-300 font-mono"
                      placeholder="your@email.com"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors duration-300 resize-none font-mono"
                    placeholder="Tell me about your project..."
                    suppressHydrationWarning
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_var(--color-glow-primary)] transition-shadow duration-300 disabled:opacity-50 cursor-hover"
                >
                  {isSending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : sent ? (
                    <>
                      <span>Message Sent!</span>
                      <span>✓</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-8" />
          <p className="font-mono text-xs text-[var(--color-text-dim)]">
            © 2025 Harin Bhavsar. Crafted with ❤️ and AI.
          </p>
          <p className="font-mono text-[10px] text-[var(--color-text-dim)] mt-2 opacity-50">
            Built with Next.js • React • Framer Motion • Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
