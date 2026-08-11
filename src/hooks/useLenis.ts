import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let lenisInstance: Lenis;
    let gsapRaf: (time: number) => void;
    let handleVisibilityChange: () => void;

    const timer = setTimeout(() => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      setLenis(lenisInstance);

      gsapRaf = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      // Connect to GSAP ticker for better sync
      gsap.ticker.add(gsapRaf);
      
      gsap.ticker.lagSmoothing(0, 0);
      
      // Connect Lenis to ScrollTrigger to cache dimensions on mount
      lenisInstance.on('scroll', ScrollTrigger.update);
      
      // Force initial cache calculations so mousemove doesn't trigger reflows
      ScrollTrigger.refresh();
      (lenisInstance as any).emit();
      
      // Refresh again once fonts are loaded and layout is stable
      if (document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      handleVisibilityChange = () => {
        if (document.hidden) {
          gsap.ticker.sleep();
        } else {
          gsap.ticker.wake();
        }
      };
      
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (lenisInstance) {
        lenisInstance.destroy();
        if (gsapRaf) gsap.ticker.remove(gsapRaf);
        if (handleVisibilityChange) document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };
  }, []);

  return lenis;
}
