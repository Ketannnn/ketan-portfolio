import { MotionValue, useSpring } from "framer-motion";
import type { SpringOptions } from "framer-motion";

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 80,
  damping: 20,
  mass: 1,
};

export function useSmoothValue(
  raw: MotionValue<number>,
  config: SpringOptions = DEFAULT_SPRING
): MotionValue<number> {
  return useSpring(raw, config);
}
