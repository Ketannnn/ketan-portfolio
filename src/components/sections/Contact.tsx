import { motion } from "framer-motion";
import { FileDown, MapPin, ArrowRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { siteConfig } from "../../config/site";
import { useScrollReveal, fadeUp, staggerContainer } from "../../hooks/useScrollReveal";
import { useCursor } from "../../context/CursorContext";
import { useMagnetic } from "../../hooks/useMagnetic";

function MagneticCTA() {
  const { ref, x, y, textX, textY } = useMagnetic(0.4);
  const { setCursorState } = useCursor();

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      style={{ x, y }}
      href={`mailto:${siteConfig.email}`}
      onMouseEnter={() => setCursorState("hover")}
      onMouseLeave={() => setCursorState("default")}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-colors duration-200"
    >
      <motion.span style={{ x: textX, y: textY }} className="flex items-center gap-2">
        Send an Email
        <ArrowRight size={18} />
      </motion.span>
    </motion.a>
  );
}

export function Contact() {
  const { ref, isInView } = useScrollReveal();
  const { setCursorState } = useCursor();

  return (
    <section
      id="contact"
      role="region"
      aria-label="Contact"
      className="py-32 sm:py-48 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <SectionHeader
              eyebrow="// contact"
              heading="Let's build something."
              className="text-center"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-stone-400 text-base sm:text-lg leading-[1.8] mb-12"
          >
            Currently looking for internships and entry-level roles in backend
            development, Python, or AI/ML. If you're working on something I
            could contribute to, I'd love to hear from you.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
            className="mb-16 w-full"
          >
            <a 
              href={`mailto:${siteConfig.email}`}
              onMouseEnter={() => setCursorState("text")}
              onMouseLeave={() => setCursorState("default")}
              className="group block relative"
            >
              <motion.span 
                className="block text-[clamp(1.5rem,5vw,4rem)] font-bold tracking-tight text-white transition-opacity duration-300 group-hover:opacity-80"
                initial={{ letterSpacing: "0.05em" }}
                whileInView={{ letterSpacing: "-0.02em" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {siteConfig.email}
              </motion.span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-1/2" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-16">
            <MagneticCTA />
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="flex items-center gap-6 justify-center"
          >
            <a
              href={siteConfig.resumeUrl}
              download
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
              className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors duration-200 font-medium"
            >
              <FileDown size={14} />
              Resume
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
              className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors duration-200 font-medium"
            >
              GitHub
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
              className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors duration-200 font-medium"
            >
              LinkedIn
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="flex items-center justify-center gap-1.5 text-xs text-subtle font-mono mt-12"
          >
            <MapPin size={11} />
            {siteConfig.location}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
