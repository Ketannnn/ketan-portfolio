import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";
import { useScrollReveal, fadeUp } from "../../hooks/useScrollReveal";
import { useCursor } from "../../context/CursorContext";

export function Contact() {
  const { ref, isInView } = useScrollReveal();
  const { setCursorState } = useCursor();

  return (
    <section
      id="contact"
      role="region"
      aria-label="Contact"
      className="pt-16 sm:pt-20 pb-12 relative overflow-hidden contain-paint"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-left">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white mb-16">
            Let's build something.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-zinc-800/60 text-left">
            {/* Column 1: Contact & Location */}
            <div className="flex flex-col">
              <span className="text-xs font-mono text-zinc-500 mb-6">
                // CONTACT
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                onMouseEnter={() => setCursorState("hover")}
                onMouseLeave={() => setCursorState("default")}
                className="text-lg font-medium text-zinc-300 hover:text-white transition-colors duration-200 w-fit group relative"
              >
                {siteConfig.email}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
              <p className="text-sm text-zinc-400 mt-4">
                Location: {siteConfig.location}
              </p>
            </div>

            {/* Column 2: Social Links */}
            <div className="flex flex-col">
              <span className="text-xs font-mono text-zinc-500 mb-6">
                // CONNECT
              </span>
              <div className="flex flex-col gap-4">
                {[
                  { label: "GitHub ↗", href: siteConfig.github },
                  { label: "LinkedIn ↗", href: siteConfig.linkedin },
                  { label: "Resume ↗", href: siteConfig.resumeUrl },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("default")}
                    className="text-zinc-400 hover:text-white transition-colors w-fit relative group text-base"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Status & Credits */}
            <div className="flex flex-col">
              <span className="text-xs font-mono text-zinc-500 mb-6">
                // AVAILABILITY
              </span>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse shrink-0" />
                <span className="text-sm text-zinc-300">
                  Open to full-time engineering roles
                </span>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <p className="text-xs text-zinc-500 font-mono">
                  © {siteConfig.copyrightYear} {siteConfig.name}.
                </p>
                <p className="text-xs text-zinc-500 font-mono">
                  Built with React, Vite, & Tailwind.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
