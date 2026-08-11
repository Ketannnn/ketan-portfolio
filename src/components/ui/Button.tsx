import React from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  download?: boolean | string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-dim hover:bg-accent text-white shadow-glow-sm hover:shadow-glow border border-accent/30 hover:border-accent/60",
  ghost:
    "bg-transparent hover:bg-surface-hover text-zinc-300 hover:text-white border border-border hover:border-border-hover",
  outline:
    "bg-transparent text-accent hover:bg-accent-muted border border-accent/40 hover:border-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  href,
  target,
  rel,
  onClick,
  className = "",
  children,
  download,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition duration-150 ease-out cursor-pointer select-none whitespace-nowrap active:scale-[0.97] hover:scale-[1.02]";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={classes}
        download={download}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
