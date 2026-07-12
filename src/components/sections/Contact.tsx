import { motion } from "framer-motion";
import { Mail, FileDown, ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import {
  useScrollReveal,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../../hooks/useScrollReveal";

// Derived from siteConfig — no magic strings inside the component.
const CONTACT_LINKS = [
  {
    id: "github",
    label: "GitHub",
    description: "Browse my projects and code",
    href: siteConfig.github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Connect and reach out",
    href: siteConfig.linkedin,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    description: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
] as const;

export function Contact() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="contact"
      role="region"
      aria-label="Contact"
      className="py-24 sm:py-32 relative"
    >
      {/* Bottom radial glow — anchors the page visually at the last section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial-glow-bottom pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* ── LEFT: Context ──
           * Heading + description + resume CTA + location.
           * This side answers: "who is this person and why should I reach out?"
           */}
          <div>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionHeader
                eyebrow="// contact"
                heading="Looking for the right opportunity."
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-base sm:text-lg leading-[1.8] mb-8 max-w-sm"
            >
              Currently looking for internships and entry-level roles in backend
              development, Python, or AI/ML. If you're working on something I
              could contribute to, I'd love to hear from you.
            </motion.p>

            <motion.div variants={staggerItem} className="mb-8">
              <Button
                variant="primary"
                size="lg"
                href={siteConfig.resumeUrl}
                download
                icon={<FileDown size={16} />}
                aria-label="Download resume PDF"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Location — subtle closing detail */}
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-1.5 text-xs text-subtle font-mono"
            >
              <MapPin size={11} />
              {siteConfig.location}
            </motion.p>
          </div>

          {/* ── RIGHT: Action links ──
           * Three contact channels as full-width clickable cards.
           * This side answers: "how do I actually reach this person?"
           * Separated from the context side so the eye can jump directly
           * to the action column without re-reading the description.
           */}
          <motion.div variants={staggerContainer} className="space-y-3 lg:pt-2">
            {CONTACT_LINKS.map((link) => (
              <motion.div key={link.id} variants={staggerItem}>
                <GlassCard className="hover-glow">
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={`${link.label}: ${link.description}`}
                    className="flex items-center justify-between p-4 sm:p-5 group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {link.label}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {link.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted group-hover:text-accent transition-colors duration-200 shrink-0"
                    />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
