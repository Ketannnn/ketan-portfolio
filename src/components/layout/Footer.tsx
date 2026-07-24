import { siteConfig } from "../../config/site";

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

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border pt-8 pb-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Nav row — same monospace aesthetic as the rest of the footer */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none">
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-mono text-subtle hover:text-muted transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright + tech stack */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-subtle">
            React · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
