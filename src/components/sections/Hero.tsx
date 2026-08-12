import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, useMotionTemplate } from "framer-motion";
import { siteConfig } from "../../config/site";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useParallax } from "../../hooks/useParallax";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursorLight } from "../../hooks/useCursorLight";
import { useCursor } from "../../context/CursorContext";

function MagneticButton({ children, href, icon, variant, download, target, rel, ariaLabel }: any) {
  const { ref, x, y, textX, textY } = useMagnetic(0.3);
  const { setCursorState } = useCursor();
  
  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      style={{ x, y }}
      href={href}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseEnter={() => setCursorState("hover")}
      onMouseLeave={() => setCursorState("default")}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition duration-200 ease-out ${
        variant === 'primary' 
          ? 'bg-white text-black hover:bg-zinc-200' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
      }`}
    >
      <motion.span style={{ x: textX, y: textY }} className="flex items-center gap-2">
        {children}
        {icon}
      </motion.span>
    </motion.a>
  );
}


export function Hero() {
  const { mouseX, mouseY } = useMousePosition();
  const { lightX, lightY, isActive: lightActive } = useCursorLight(mouseX, mouseY);
  

  
  // Parallax layers
  const bgParallax = useParallax(mouseX, mouseY, 25);
  const h1Parallax = useParallax(mouseX, mouseY, 12);
  const subtitleParallax = useParallax(mouseX, mouseY, 8);

  // Use Framer Motion template to derive mask strings dynamically
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;
  const lightBackground = useMotionTemplate`radial-gradient(600px circle at ${lightX}px ${lightY}px, rgba(99,102,241,0.06), transparent 40%)`;

  return (
    <section
      id="home"
      role="region"
      aria-label="Introduction"
      className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 py-24 min-h-[90vh] px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Layer 0 — Ambient Top Spotlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] sm:w-[800px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl rounded-full pointer-events-none will-change-transform"
          style={{ transform: "translate(-50%, 0) translateZ(0)" }}
        />
      </motion.div>

      {/* Layer 1 — Engineering grid */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage,
          WebkitMaskImage: maskImage
        }}
      />

      {/* Layer 2 — Cursor light */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: lightBackground
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: lightActive ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Column 1 - Text */}
      <div className="flex flex-col items-start text-left z-10 pointer-events-auto w-full max-w-2xl mx-auto lg:mx-0 pt-20 lg:pt-0">
        <motion.div 
          style={{ x: h1Parallax.x, y: h1Parallax.y }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col w-full"
        >
          <p className="text-xl md:text-2xl text-stone-400 font-mono tracking-wide mb-2">
            Hello! I'm
          </p>
          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.95] font-bold text-white tracking-[-0.04em] uppercase">
            {siteConfig.name.split(' ')[0]}
            <br />
            <span className="text-gradient">
              {siteConfig.name.split(' ')[1] || ''}
            </span>
          </h1>
        </motion.div>

        <motion.div 
          style={{ x: subtitleParallax.x, y: subtitleParallax.y }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start mt-6 w-full"
        >
          <p className="text-xl md:text-2xl text-stone-400 font-mono tracking-wide mb-2">
            A Creative
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-bold text-stone-400 tracking-[-0.04em] uppercase text-gradient">
            DEVELOPER
            <br />
            <span className="text-white">ENGINEER</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mt-12 w-full"
        >
          <MagneticButton
            variant="primary"
            href="#projects"
            icon={<ArrowRight size={16} />}
          >
            View My Work
          </MagneticButton>
        </motion.div>
      </div>

      {/* Column 2 - Gradient Card */}
      <div className="relative h-full flex items-center justify-center z-10 w-full pb-20 lg:pb-0">
        <motion.div 
          style={{ 
            x: h1Parallax.x, 
            y: h1Parallax.y,
            rotateX: bgParallax.y,
            rotateY: bgParallax.x,
          }}
          className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] flex items-center justify-center group will-change-transform"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full transition-transform duration-700 ease-out group-hover:scale-110" />
          
          {/* Floating Glass Shape */}
          <motion.div 
            style={{ x: h1Parallax.x, y: h1Parallax.y }}
            className="absolute w-full h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl overflow-hidden shadow-2xl flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.3),transparent_50%)]" />
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
              alt="Abstract Concept" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-500 ease-out hover:scale-105"
              decoding="async"
            />
            <span className="relative z-10 text-[120px] sm:text-[180px] font-serif text-white/10 pointer-events-none select-none mix-blend-overlay">
              {siteConfig.initials}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">
          scroll
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-full h-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
