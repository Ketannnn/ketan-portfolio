import { motion } from "framer-motion";
import { Code2, Database, Globe } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { SkillBadge } from "../ui/SkillBadge";
import { skills } from "../../data/skills";
import {
  useScrollReveal,
  fadeUp,
  staggerContainer,
  staggerItem,
  scaleUp,
} from "../../hooks/useScrollReveal";

// Maps category IDs → Lucide icons for scannable category headers.
// Icons are in text-zinc-500 (not accent) — they are structural, not emphasis.
const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  programming: Code2,
  "data-tools": Database,
};

export function Skills() {
  const { ref, isInView } = useScrollReveal();

  // Spoken languages are intentionally separated from technical categories.
  // Rendering "English" and "Python" as the same badge type sends the wrong
  // signal — one is a spoken language, the other is a programming skill.
  const techCategories = skills.filter((c) => c.id !== "languages");
  const languageCategory = skills.find((c) => c.id === "languages");

  return (
    <section
      id="skills"
      role="region"
      aria-label="Technical skills"
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
              eyebrow="// skills"
              heading="What I work with"
            />
          </motion.div>

          {/* ── Technical skill cards ──
           * max-w-3xl keeps two cards from stretching too wide
           * when content is thin (3–4 badges per card).
           * Without this constraint, each card would be ~560px wide
           * on desktop — too much space for a handful of pills.
           */}
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
            {techCategories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id];
              return (
                <motion.div key={category.id} variants={scaleUp}>
                  <GlassCard className="p-6 h-full">
                    {/* Category label with icon — NOT in accent color */}
                    <div className="flex items-center gap-2 mb-5">
                      {Icon && (
                        <Icon size={13} className="text-zinc-500 shrink-0" />
                      )}
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted font-mono">
                        {category.label}
                      </p>
                    </div>

                    {/* Skill badges.
                     * No inner staggerContainer — badges already animate via
                     * the parent staggerItem. A nested container with its own
                     * animate prop creates timing conflicts with the outer stack.
                     */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <SkillBadge key={skill} label={skill} />
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* ── Spoken languages ──
           * Rendered as a plain text row, NOT as SkillBadge pills.
           * A spoken language and a programming language are different things —
           * giving them the same visual treatment (hoverable tech badges) is
           * semantically misleading and visually jarring.
           */}
          {languageCategory && (
            <motion.div variants={staggerItem} className="mt-5 max-w-3xl">
              <div className="flex items-center gap-2.5 px-0.5">
                <Globe size={12} className="text-zinc-600 shrink-0" />
                <p className="text-[11px] font-mono text-subtle">
                  {languageCategory.label.toLowerCase()}:{" "}
                  <span className="text-zinc-500">
                    {languageCategory.skills.join(" · ")}
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
