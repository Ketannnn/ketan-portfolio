import { siteConfig } from "../../config/site";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-border py-8 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
        <p>
          © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-subtle">
          Built with React · TypeScript · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  );
}
