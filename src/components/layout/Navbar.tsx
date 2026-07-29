import { useState, useEffect, useRef } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursor } from "../../context/CursorContext";
import { siteConfig } from "../../config/site";
import { Button } from "../ui/Button";

// "Home" is intentionally excluded from NAV_LINKS.
// The logo already serves as the home/back-to-top affordance.
// Removing it declutters the pill and eliminates a redundant link.
const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  // Used to set `inert` on the mobile menu when closed, removing all its
  // children from the keyboard tab order without affecting CSS transitions.
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveSection(SECTION_IDS);
  const { setCursorState } = useCursor();
  const { ref: logoRef, x: logoX, y: logoY } = useMagnetic(0.3);

  // Trigger background blur once scrolled past hero fold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when resizing back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync inert attribute: when closed, the menu is removed from tab order.
  // This prevents keyboard users from accidentally focusing hidden links.
  // Uses a ref + imperative DOM update to avoid TypeScript type conflicts
  // (React 18 doesn't include `inert` in HTMLAttributes types).
  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.inert = !mobileOpen;
    }
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? "bg-base/80 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
        }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
      >
        {/* Logo — clicking returns to top */}
        <motion.a
          ref={logoRef as React.RefObject<HTMLAnchorElement>}
          style={{ x: logoX, y: logoY }}
          href="#home"
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
          aria-label={`${siteConfig.name} — back to top`}
          className="text-white font-bold text-lg tracking-tight transition-opacity duration-200 hover:opacity-70 inline-block origin-center"
        >
          {siteConfig.initials}
          <span className="text-accent">.</span>
        </motion.a>

        {/* ── Desktop nav pill with sliding active indicator ── */}
        {/*
         * LayoutGroup ensures the layoutId="nav-pill" motion.div
         * uses Framer Motion's FLIP animation to slide smoothly
         * between links as the active section changes while scrolling.
         * The sliding background replaces the old instant bg-swap.
         */}
        <LayoutGroup>
          <motion.ul
            role="list"
            className="hidden md:flex items-center gap-0.5 p-1 rounded-full glass"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } }
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <motion.li 
                  key={link.href}
                  variants={{
                    hidden: { y: -8, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 } }
                  }}
                >
                  <a
                    href={link.href}
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("default")}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium
                                transition-colors duration-200 select-none
                      ${isActive ? "text-white" : "text-muted hover:text-white"}`}
                  >
                    {/* Sliding background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Hover underline */}
                    {!isActive && (
                      <motion.span
                        className="absolute bottom-1 left-3.5 right-3.5 h-[1px] bg-white/50 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </LayoutGroup>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button
            variant="ghost"
            size="sm"
            href={siteConfig.resumeUrl}
            download
            icon={<FileDown size={14} />}
            aria-label="Download resume PDF"
          >
            Resume
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile nav panel ── */}
      {/* role="dialog" removed: this is a disclosure/expandable panel, not a modal.
       *  aria-controls + aria-expanded on the trigger button is the correct ARIA
       *  pattern. The inert attribute (managed via ref above) handles tab order. */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`md:hidden transition-all duration-300 overflow-hidden
          ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-base/95 backdrop-blur-md border-t border-border px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "text-white bg-white/10"
                    : "text-muted hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mt-3 pt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              href={siteConfig.resumeUrl}
              download
              icon={<FileDown size={14} />}
              className="w-full justify-center"
              aria-label="Download resume PDF"
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
