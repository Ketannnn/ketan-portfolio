import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  /** Adds an indigo glow shadow */
  glow?: boolean;
  className?: string;
  /** HTML element to render. Default: "div" */
  as?: "div" | "article" | "section" | "li";
}

/**
 * Semi-transparent dark card with glassmorphism border.
 * Core surface component used throughout the portfolio.
 */
export function GlassCard({
  children,
  glow = false,
  className = "",
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={`glass rounded-xl transition-all duration-300 hover-glow
        ${glow ? "shadow-glow" : "shadow-card"} ${className}`}
    >
      {children}
    </Tag>
  );
}
