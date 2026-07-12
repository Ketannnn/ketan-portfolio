interface SkillBadgeProps {
  label: string;
}

/**
 * Rounded pill badge for a single technology/skill name.
 * Used inside skill category cards and project stack lists.
 */
export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        bg-white/5 border border-white/10 text-zinc-300
        hover:bg-accent-muted hover:border-accent/30 hover:text-accent
        transition-all duration-200 cursor-default"
    >
      {label}
    </span>
  );
}
