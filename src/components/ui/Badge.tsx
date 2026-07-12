import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  /** Shows a pulsing dot before the label */
  pulse?: boolean;
  className?: string;
}

/**
 * Status / label badge.
 * Used for things like "AVAILABLE TO WORK" in the Hero section.
 */
export function Badge({ children, pulse = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase
        bg-accent-muted border border-accent/25 text-accent ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
