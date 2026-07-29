import { MotionValue, useTransform } from "framer-motion";

export function useParallax(
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  strength: number = 10
): { x: MotionValue<number>; y: MotionValue<number> } {
  // Map mouse position to a range between -strength and +strength
  const x = useTransform(
    mouseX,
    [0, typeof window !== "undefined" ? window.innerWidth : 1000],
    [-strength, strength]
  );
  const y = useTransform(
    mouseY,
    [0, typeof window !== "undefined" ? window.innerHeight : 800],
    [-strength, strength]
  );

  return { x, y };
}
