import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSmoothValue } from "../../hooks/useSmoothValue";
import { useCursor } from "../../context/CursorContext";

export function ProjectCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLElement>(null);
  const rectRef = useRef<{ left: number, top: number, width: number, height: number } | null>(null);
  const { setCursorState } = useCursor();

  // Local mouse position tracking for the card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth values for 3D tilt
  const smoothX = useSmoothValue(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSmoothValue(mouseY, { stiffness: 120, damping: 20 });

  // Map mouse position to rotation (max 4 degrees)
  // Input range: 0 to 1, Output range: -4 to 4
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]); // Invert Y for correct tilt

  const handleMouseEnter = () => {
    setCursorState("default");
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rectRef.current = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rectRef.current || !cardRef.current) return;
    const { left, top, width, height } = rectRef.current;
    
    // Normalize mouse position relative to card (0 to 1) using page coordinates
    const x = (e.pageX - left) / width;
    const y = (e.pageY - top) / height;

    mouseX.set(x);
    mouseY.set(y);

    // Update CSS variables for spotlight effect
    cardRef.current.style.setProperty("--mouse-x", `${e.pageX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.pageY - top}px`);
  };

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 sm:p-8 grid lg:grid-cols-2 gap-8 items-start group overflow-hidden rounded-2xl glass transition-colors duration-300 ease-out hover:border-accent/40"
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.08), transparent 80%)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-start w-full col-span-full">
        {children}
      </div>
    </motion.article>
  );
}
