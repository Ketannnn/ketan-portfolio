import { motion } from "framer-motion";
import { Terminal, Sparkles, Target } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
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
      className="py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
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

            {/* Bio with text wipe reveal */}
            <div className="space-y-5 text-zinc-400 leading-[1.8] mt-8">
              {aboutBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-base sm:text-lg"
                  variants={fadeUp}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Highlight cards ── */}
          <motion.div variants={staggerContainer} className="grid gap-4">
            {aboutCards.map((card) => {
              const Icon = ICON_MAP[card.iconKey];
              return (
                <motion.div key={card.id} variants={staggerItem}>
                  <motion.div
                    className="p-5 flex items-start gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md overflow-hidden relative group"
                    whileHover="hover"
                    initial="rest"
                  >
                    {/* Hover Glow */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: "inset 0 0 20px rgba(99,102,241,0.06)" }}
                    />
                    
                    {/* Icon — only sparkles uses accent; others use zinc for variety */}
                    <div
                      className={`shrink-0 p-3 rounded-lg mt-0.5 border relative z-10 transition-colors duration-300 group-hover:border-white/20 ${
                        card.iconKey === "sparkles"
                          ? "bg-accent-muted border-accent/20"
                          : "bg-white/4 border-white/10"
                      }`}
                    >
                      <motion.div
                        variants={{
                          rest: { x: 0 },
                          hover: { 
                            x: card.iconKey === "terminal" ? [0, 2, -2, 0] : 0,
                            rotate: card.iconKey === "sparkles" ? [0, 15, -15, 0] : 0,
                            scale: card.iconKey === "target" ? [1, 1.1, 1] : 1,
                            transition: { duration: 0.4 } 
                          }
                        }}
                      >
                        <Icon
                          size={18}
                          className={
                            card.iconKey === "sparkles"
                              ? "text-accent"
                              : "text-zinc-300"
                          }
                        />
                      </motion.div>
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-white leading-tight">
                        {card.label}
                      </p>
                      <p className="text-xs text-muted mt-1.5 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
