import { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";
import { useSmoothValue } from "./useSmoothValue";

export function useCursorLight(mouseX: MotionValue<number>, mouseY: MotionValue<number>): {
  lightX: MotionValue<number>;
  lightY: MotionValue<number>;
  isActive: boolean;
} {
  const [isActive, setIsActive] = useState(false);
  
  const lightX = useSmoothValue(mouseX, { stiffness: 80, damping: 20 });
  const lightY = useSmoothValue(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    // Activate cursor light after 2200ms to match timeline
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 2200);
    
    return () => clearTimeout(timer);
  }, []);

  return { lightX, lightY, isActive };
}
