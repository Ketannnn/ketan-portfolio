import React, { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { siteConfig } from "../../config/site";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useParallax } from "../../hooks/useParallax";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursorLight } from "../../hooks/useCursorLight";
import { useCursor } from "../../context/CursorContext";
const Hero3D = React.lazy(() => import("../ui/Hero3D"));

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
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition duration-200 ease-out ${variant === 'primary'
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

  // Derive light transforms for GPU-accelerated motion (radius 600px -> center offset -600px)
  const lightTransformX = useTransform(lightX, (x) => x - 600);
  const lightTransformY = useTransform(lightY, (y) => y - 600);

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

      {/* Layer 1 — Engineering grid (Static mask avoids GPU repaint storm) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 10%, transparent 80%)"
        }}
      />

      {/* Layer 2 — Cursor light (GPU transform avoids background layout recalculation) */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none z-[2] w-[1200px] h-[1200px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(99,102,241,0.06), transparent 40%)",
          x: lightTransformX,
          y: lightTransformY
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
            SOFTWARE
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

      {/* Column 2 - Gradient Card and 3D Avatar */}
      <div className="relative h-full flex items-center justify-center z-10 w-full pb-20 lg:pb-0 overflow-hidden min-h-[400px] sm:min-h-[500px]">

        <div className="absolute inset-0 z-10 overflow-hidden">
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </div>

        <motion.div
          style={{
            rotateX: bgParallax.y,
            rotateY: bgParallax.x,
          }}
          className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] flex items-center justify-center group"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full transition-transform duration-700 ease-out group-hover:scale-110" />

          {/* Floating Glass Shape — isolation:isolate forces Safari to composite backdrop-blur
               independently from the animated parent, avoiding the cold-start GPU stall */}
          <div
            className="absolute w-full h-full rounded-[2rem] border border-white/10 bg-[#090d17]/40 backdrop-blur-md overflow-hidden shadow-2xl flex items-center justify-center"
            style={{ isolation: 'isolate', transform: 'translateZ(0)' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.3),transparent_50%)]" />
            <img
              src="/images/hero-bg.jpg"
              alt="Abstract Concept"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-500 ease-out hover:scale-105"
              decoding="async"
            />
            <span className="relative z-10 text-[120px] sm:text-[180px] font-serif text-white/10 pointer-events-none select-none mix-blend-overlay">
              {siteConfig.initials}
            </span>
          </div>
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
