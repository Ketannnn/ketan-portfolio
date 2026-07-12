import { motion } from "framer-motion";
import { Terminal, Sparkles, Target } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { aboutBio, aboutCards, type AboutCard } from "../../data/about";
import {
  useScrollReveal,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../hooks/useScrollReveal";

// Icon map — keeps icons out of the data layer while keeping data serializable
const ICON_MAP = {
  terminal: Terminal,
  sparkles: Sparkles,
  target: Target,
} satisfies Record<AboutCard["iconKey"], React.ComponentType<{ size?: number; className?: string }>>;

export function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="about"
      role="region"
      aria-label="About me"
      className="py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* ── LEFT: Bio ── */}
          <div>
            <motion.div variants={fadeUp}>
              <SectionHeader
                eyebrow="// about"
                heading="How I think about building software"
                className="mb-8"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="space-y-5 text-zinc-400 leading-[1.8]"
            >
              {aboutBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={staggerItem}
                  className="text-base sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Highlight cards ── */}
          <motion.div variants={staggerContainer} className="grid gap-4">
            {aboutCards.map((card) => {
              const Icon = ICON_MAP[card.iconKey];
              return (
                <motion.div key={card.id} variants={staggerItem}>
                  <GlassCard className="p-5 flex items-start gap-4">
                    {/* Icon — only sparkles uses accent; others use zinc for variety */}
                    <div
                      className={`shrink-0 p-3 rounded-lg mt-0.5 border ${
                        card.iconKey === "sparkles"
                          ? "bg-accent-muted border-accent/20"
                          : "bg-white/4 border-white/10"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          card.iconKey === "sparkles"
                            ? "text-accent"
                            : "text-zinc-300"
                        }
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {card.label}
                      </p>
                      <p className="text-xs text-muted mt-1.5 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
