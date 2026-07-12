import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { education } from "../../data/education";
import {
  useScrollReveal,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../hooks/useScrollReveal";

export function Education() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="education"
      role="region"
      aria-label="Education"
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
              eyebrow="// education"
              heading="Where I study"
            />
          </motion.div>

          {/* max-w-3xl — single card shouldn't feel cramped */}
          <div className="max-w-3xl space-y-5">
            {education.map((item) => (
              <motion.div key={item.id} variants={staggerItem}>
                <GlassCard className="p-6 sm:p-7">
                  <div className="flex items-start gap-5">
                    {/* GraduationCap icon — single accent usage, justified here */}
                    <div className="shrink-0 p-3 rounded-xl bg-accent-muted border border-accent/20 mt-0.5">
                      <GraduationCap size={20} className="text-accent" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Top row: short name + status badge */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <h3 className="text-base font-semibold text-white leading-snug">
                          {item.shortName}
                        </h3>
                        {/* "Final Year" badge — communicates graduation timeline
                          * to recruiters without them having to do date math */}
                        <span className="text-[11px] font-mono text-muted bg-white/5 border border-border px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                          Final Year · {item.years.split("–")[1].trim()}
                        </span>
                      </div>

                      {/* Full institution name — secondary, smaller */}
                      <p className="text-xs text-zinc-500 mb-1 leading-relaxed">
                        {item.institution}
                      </p>

                      {/* Degree — NOT in accent; it's content, not an interactive state */}
                      <p className="text-sm font-medium text-zinc-300 mb-4">
                        {item.degree} · {item.field}
                      </p>

                      {/* Meta row: dates, location, CGPA */}
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} className="shrink-0" />
                          {item.years}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} className="shrink-0" />
                          {item.location}
                        </span>
                        {item.cgpa && (
                          /* No Award icon — Award implies an achievement.
                           * CGPA is a metric, not an award. Shown with / 10
                           * scale context since that's standard for Indian
                           * engineering programs and means nothing without it. */
                          <span className="font-mono">
                            CGPA {item.cgpa} / 10
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
