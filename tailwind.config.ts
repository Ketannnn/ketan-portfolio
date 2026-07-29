import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#09090b",
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.07)",
        border: "rgba(255,255,255,0.08)",
        "border-hover": "rgba(255,255,255,0.16)",
        accent: {
          DEFAULT: "#818cf8",
          dim: "#6366f1",
          muted: "rgba(99,102,241,0.15)",
        },
        muted: "#71717a",
        subtle: "#52525b",
        "stone-400": "#a8a29e",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontSize: {
        "display-sm": ["4rem", { lineHeight: "1" }],
        "display-md": ["5.5rem", { lineHeight: "1" }],
        "display-lg": ["7rem", { lineHeight: "1" }],
      },
      boxShadow: {
        glow: "0 0 60px rgba(99,102,241,0.18)",
        "glow-sm": "0 0 30px rgba(99,102,241,0.12)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.14) 0%, transparent 60%)",
        "radial-glow-bottom":
          "radial-gradient(ellipse 60% 40% at 50% 110%, rgba(99,102,241,0.1) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
