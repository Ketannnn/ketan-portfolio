import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

export interface ScrollRevealOptions {
  /** Fraction of the element visible before triggering. Default: 0.15 */
  threshold?: number;
  /** Only trigger once. Default: true */
  once?: boolean;
  /** Pixel margin before triggering. Default: "0px 0px -60px 0px" */
  margin?: string;
}

/**
 * Returns a ref and a boolean `isInView` for use with Framer Motion animate props.
 *
 * Usage:
 * ```tsx
 * const { ref, isInView } = useScrollReveal();
 * <motion.div ref={ref} animate={isInView ? "visible" : "hidden"} variants={fadeUp} />
 * ```
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, once = true, margin = "0px 0px -60px 0px" } =
    options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin: margin as any,
  });

  return { ref, isInView };
}

/** Standard fade-up variants for Framer Motion */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Stagger container — use on a wrapping element when children stagger in */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Fade-up variant for staggered children */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Slide-in-from-left variant — used for Experience timeline entries.
 * The horizontal slide reinforces the left-to-right reading direction
 * of the timeline visual, making the reveal feel directional and intentional.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Scale-up variant — used for Skills category cards.
 * A subtle 0.96→1.0 scale gives the grid reveal a distinct character
 * compared to the universal fadeUp used in most other sections.
 * The scale is imperceptible at rest but noticeable during the reveal.
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
