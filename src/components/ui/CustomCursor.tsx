import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useCursor } from "../../context/CursorContext";
import { useSmoothValue } from "../../hooks/useSmoothValue";

export function CustomCursor() {
  const { cursorState } = useCursor();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dot is very responsive
  const dotX = useSmoothValue(mouseX, { stiffness: 300, damping: 25, mass: 1 });
  const dotY = useSmoothValue(mouseY, { stiffness: 300, damping: 25, mass: 1 });

  // Ring lags slightly
  const ringX = useSmoothValue(mouseX, { stiffness: 60, damping: 15, mass: 1 });
  const ringY = useSmoothValue(mouseY, { stiffness: 60, damping: 15, mass: 1 });

  useEffect(() => {
    // Avoid jarring position jump on initial render
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle pointer interactions automatically globally if needed, 
  // or via context setting in individual components.
  // For simplicity, we can just rely on the CursorContext being updated by specific elements.

  return (
    <>
      {/* DOT */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] -ml-1 -mt-1"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: cursorState === "hover" ? 0 : cursorState === "text" ? 0 : 1,
          opacity: cursorState === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* RING */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99] -ml-4 -mt-4"
        style={{ 
          x: ringX, 
          y: ringY,
          border: cursorState === "text" ? "none" : "1px solid rgba(255,255,255,0.3)",
          mixBlendMode: cursorState === "hover" ? "difference" : "normal",
        }}
        animate={{
          scale: cursorState === "hover" ? 1.5 : cursorState === "text" ? 1.2 : 1,
          width: cursorState === "text" ? "2px" : "32px",
          height: cursorState === "text" ? "24px" : "32px",
          backgroundColor: cursorState === "hover" ? "rgba(255,255,255,1)" : cursorState === "text" ? "rgba(255,255,255,0.8)" : "transparent",
          borderRadius: cursorState === "text" ? "2px" : "50%",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
