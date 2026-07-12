import { motion } from "framer-motion";
import { MapPin, Briefcase, ShieldCheck } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { experience } from "../../data/experience";
import {
  useScrollReveal,
  fadeUp,
  staggerContainer,
  staggerItem,
  slideInLeft,
} from "../../hooks/useScrollReveal";

// Each role gets a distinct icon that communicates the type of work at a glance.
// Briefcase = software/web development, ShieldCheck = security.
// This makes the timeline scannable without reading every word.
const ROLE_ICONS = {
  devtechie: Briefcase,
  "wisdom-sprouts": ShieldCheck,
} as const;

export function Experience() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="experience"
      role="region"
      aria-label="Work experience"
      className="py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-14">
            <SectionHeader
              eyebrow="// experience"
              heading="Where I've grown"
            />
          </motion.div>

          {/* ── Timeline ── */}
          {/*
           * Layout: a relative container holds an absolute vertical line
           * running top-to-bottom. Each entry is a flex row: icon dot on
           * the left, glass card on the right. The gradient line fades out
           * naturally below the last entry — no hardcoded heights needed.
           */}
          <div className="max-w-2xl relative">
            {/* Vertical connector — gradient fades from accent to transparent */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-[18px] w-px h-full bg-gradient-to-b from-accent/40 via-border/30 to-transparent"
            />

            <div className="space-y-8">
              {experience.map((item, index) => {
                const isLatest = index === 0;
                const Icon =
                  ROLE_ICONS[item.id as keyof typeof ROLE_ICONS] ?? Briefcase;

                return (
                  <motion.div
                    key={item.id}
                    variants={slideInLeft}
                    className="flex gap-5 items-start"
                  >
                    {/* ── Icon dot ──
                     * Most recent role: accent-filled ring (stands out).
                     * Earlier role: subtle zinc ring (recedes).
                     * Both are positioned z-10 so they render above the line.
                     */}
                    <div
                      className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center relative z-10
                        ${isLatest
                          ? "bg-accent-muted border border-accent/40"
                          : "bg-surface border border-border"
                        }`}
                    >
                      <Icon
                        size={14}
                        className={isLatest ? "text-accent" : "text-zinc-500"}
                      />
                    </div>

                    {/* ── Card ── */}
                    <GlassCard className="flex-1 p-5 sm:p-6">
                      {/* Header: role + company on left, period + location on right */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-0">
                        <div>
                          <h3 className="text-sm font-semibold text-white leading-snug">
                            {item.title}
                          </h3>
                          {/* Company in zinc-300 — NOT accent, which would compete
                              with the dot icon already using accent above */}
                          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                            {item.company}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="text-[11px] font-mono text-muted bg-white/5 border border-border px-2.5 py-1 rounded-full whitespace-nowrap">
                            {item.period}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-subtle">
                            <MapPin size={10} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Bullet points — separated from header by a subtle rule */}
                      {item.bullets.length > 0 && (
                        <ul className="space-y-2.5 mt-4 border-t border-border pt-4">
                          {item.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-xs sm:text-sm text-zinc-400 leading-[1.7]"
                            >
                              {/* Zinc dot — accent is reserved for the icon above */}
                              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
