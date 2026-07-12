import { ArrowDown, Mail, FileDown, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { staggerContainer, staggerItem } from "../../hooks/useScrollReveal";

// ─── Illustration Placeholder ────────────────────────────────────────────────
// This space is reserved for a custom illustrated figure based on a real photo.
// The placeholder is intentionally designed to feel like part of the layout —
// not an empty box. Replace by dropping a <HeroPhoto /> component here later.
function IllustrationPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center w-72 h-[360px]">
        {/* Ambient glow behind the frame */}
        <div className="absolute inset-4 rounded-3xl bg-accent/8 blur-2xl" />

        {/* Glass frame — portrait ratio, matches a photo crop */}
        <div className="relative w-full h-full rounded-3xl glass overflow-hidden flex flex-col items-center justify-center">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Concentric focus rings — visual anchor for the portrait */}
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute h-52 w-52 rounded-full border border-accent/20"
            />
            {/* Mid ring */}
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
              className="absolute h-36 w-36 rounded-full border border-accent/30"
            />
            {/* Inner fill */}
            <motion.div
              animate={{ opacity: [0.4, 0.65, 0.4] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
              className="h-20 w-20 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center"
            >
              <div className="h-8 w-8 rounded-full bg-accent/20" />
            </motion.div>
          </div>

          {/* Bottom label — styled as a developer comment */}
          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-[10px] font-mono text-subtle tracking-widest mt-2">
              {"{ /* portrait */ }"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Social link row ──────────────────────────────────────────────────────────
// Unified style: all three links are icon + label, identical treatment.
const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.github, external: true },
  { label: "LinkedIn", href: siteConfig.linkedin, external: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, external: false },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="home"
      role="region"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Radial glow — top center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial-glow pointer-events-none"
      />

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        {/* Two-column grid: content left, illustration right */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Availability badge */}
            <motion.div variants={staggerItem} className="mb-7">
              <Badge pulse>Available for internships</Badge>
            </motion.div>

            {/* Location · discipline — thin accent line anchors this as a label */}
            <motion.p
              variants={staggerItem}
              className="text-sm text-muted font-mono tracking-wide mb-5 flex items-center gap-2.5"
            >
              <span className="h-px w-4 bg-accent/50 shrink-0" />
              Computer Engineering · Pune, India
            </motion.p>

            {/* Name — primary heading */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-6"
            >
              {siteConfig.name.split(" ")[0]}
              <br />
              <span className="text-gradient">
                {siteConfig.name.split(" ")[1]}.
              </span>
            </motion.h1>

            {/* Description — specific, honest, memorable */}
            <motion.p
              variants={staggerItem}
              className="text-zinc-400 text-base sm:text-lg leading-[1.8] max-w-lg mb-5"
            >
              Final-year CE student in Pune. I write Python backends, build
              developer tools, and explore what computer vision can do —
              currently shipping an AI fitness trainer that watches your form
              and talks back.
            </motion.p>

            {/* Currently exploring — signals active learning */}
            <motion.div variants={staggerItem} className="mb-8">
              <p className="text-xs text-subtle font-mono mb-2 tracking-wide">
                currently exploring
              </p>
              <div className="flex flex-wrap gap-2">
                {["MediaPipe", "LLM APIs", "Machine Learning", "Computer Vision"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/4 border border-white/8 text-zinc-400"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                aria-label="View my projects"
              >
                View My Work
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={siteConfig.resumeUrl}
                download
                icon={<FileDown size={16} />}
                aria-label="Download resume PDF"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social links — consistent icon+label style */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-1"
            >
              {SOCIAL_LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center">
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-muted hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <ExternalLink size={11} className="shrink-0 opacity-60" />
                    {link.label}
                  </a>
                  {i < SOCIAL_LINKS.length - 1 && (
                    <span className="h-3 w-px bg-border mx-0.5" />
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Illustration placeholder ── */}
          <IllustrationPlaceholder />
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
