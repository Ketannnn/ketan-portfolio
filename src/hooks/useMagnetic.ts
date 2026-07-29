import { useRef, useEffect } from "react";
import type { RefObject } from "react";
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

export function useMagnetic(strength: number = 0.4): {
  ref: RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  textX: MotionValue<number>;
  textY: MotionValue<number>;
} {
  const ref = useRef<HTMLElement | null>(null);
  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const rawTextX = useMotionValue(0);
  const rawTextY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 1 };
  
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const textX = useSpring(rawTextX, springConfig);
  const textY = useSpring(rawTextY, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate bounded movement (max 10px)
      const moveX = Math.max(-10, Math.min(10, distanceX * strength));
      const moveY = Math.max(-10, Math.min(10, distanceY * strength));
      
      rawX.set(moveX);
      rawY.set(moveY);
      
      rawTextX.set(moveX * 0.6);
      rawTextY.set(moveY * 0.6);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
      rawTextX.set(0);
      rawTextY.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY, rawTextX, rawTextY, strength]);

  return { ref, x, y, textX, textY };
}
