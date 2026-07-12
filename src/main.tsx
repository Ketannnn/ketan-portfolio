import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element with id "root" not found. Check your index.html.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    {/*
     * reducedMotion="user" reads the OS-level prefers-reduced-motion setting.
     * When enabled, Framer Motion skips all animation variants and renders
     * elements at their final (visible) state instantly — no per-component changes
     * needed. This covers every motion.div, layout animation, and transition
     * in the portfolio from a single configuration point.
     */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);
