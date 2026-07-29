import { motion } from "framer-motion";

interface SkillBadgeProps {
  label: string;
}

/**
 * Rounded pill badge for a single technology/skill name.
 * Used inside skill category cards and project stack lists.
 */
export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300 cursor-default"
      whileHover={{
        backgroundColor: "rgba(99,102,241,0.15)",
        borderColor: "rgba(99,102,241,0.3)",
        color: "#818cf8",
        boxShadow: "0 0 12px rgba(99,102,241,0.15)"
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {label}
    </motion.span>
  );
}
