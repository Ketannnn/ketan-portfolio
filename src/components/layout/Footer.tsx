import { siteConfig } from "../../config/site";
import { motion } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursor } from "../../context/CursorContext";
// Section links rendered in the footer so a recruiter reaching the
// bottom of the page has a direct path back to any section without
// having to scroll all the way back up to the navbar.
const FOOTER_NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

function MagneticFooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const { ref, x, y, textX, textY } = useMagnetic(0.2);
  const { setCursorState } = useCursor();

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      style={{ x, y }}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setCursorState("hover")}
      onMouseLeave={() => setCursorState("default")}
      className="inline-block p-2 text-xs font-mono text-subtle hover:text-white transition-colors duration-200"
    >
      <motion.span style={{ x: textX, y: textY }} className="block">
        {label}
      </motion.span>
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border pt-8 pb-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Nav row — same monospace aesthetic as the rest of the footer */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 list-none">
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <MagneticFooterLink href={link.href} label={link.label} />
              </li>
            ))}
            <li>
              <span className="text-white/10 text-xs px-2 pointer-events-none select-none">|</span>
            </li>
            <li>
              <MagneticFooterLink href={siteConfig.github} label="GitHub" external />
            </li>
            <li>
              <MagneticFooterLink href={siteConfig.linkedin} label="LinkedIn" external />
            </li>
          </ul>
        </nav>

        {/* Copyright + tech stack */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono overflow-hidden">
          <p className="shrink-0">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="relative w-full sm:w-auto overflow-hidden">
            <p className="text-subtle whitespace-nowrap animate-pulse-slow sm:animate-none">
              Built with React · TypeScript · Vite · Tailwind · Framer Motion · GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
