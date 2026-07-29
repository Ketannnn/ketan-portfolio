import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Connect to GSAP ticker for better sync
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.ticker.sleep();
      } else {
        gsap.ticker.wake();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return lenis;
}
