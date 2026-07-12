interface SectionHeaderProps {
  /** Small label above the heading (e.g. "// about") */
  eyebrow: string;
  /** Main section heading */
  heading: string;
  /** Optional subtext below the heading */
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section heading used at the top of every page section.
 * Eyebrow uses accent color; heading uses large white text.
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-accent font-mono">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="text-muted text-sm sm:text-base max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
