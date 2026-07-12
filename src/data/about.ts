/**
 * Content for the About section.
 * Edit bio paragraphs and highlight cards here without touching the component.
 */

export const aboutBio: string[] = [
  "I got into programming because I wanted to build things that do something useful — not just display information, but automate it, analyse it, or act on it. My first real project was a Flask API console. It was simple, but it ran correctly, and that feeling is still what pulls me to the keyboard.",
  "I learn by shipping. The AI Fitness Trainer started as one question: can a laptop camera give you the same feedback a trainer's eye does? I didn't know MediaPipe or how to wire an LLM into a real-time loop when I started. I figured it out while building it. That's the approach I want to carry forward.",
  "Long term, I want to be an engineer who can own a system end-to-end — backend architecture, API design, and the product layer that makes it actually useful to real people. Right now I'm most focused on deepening my Python skills and understanding how AI integrates into real production environments.",
];

export interface AboutCard {
  id: string;
  label: string;
  description: string;
  /** Lucide icon name — mapped to component in About.tsx */
  iconKey: "terminal" | "sparkles" | "target";
}

export const aboutCards: AboutCard[] = [
  {
    id: "approach",
    label: "How I work",
    description:
      "Pick a real problem. Ship something small. Learn from it. Repeat until it works well.",
    iconKey: "terminal",
  },
  {
    id: "current",
    label: "Currently building",
    description:
      "AI Fitness Trainer — pose estimation with MediaPipe, rep counting, and LLM-generated feedback.",
    iconKey: "sparkles",
  },
  {
    id: "goal",
    label: "Where I'm heading",
    description:
      "Full-stack ownership: backend systems, AI pipelines, and interfaces that are worth using.",
    iconKey: "target",
  },
];
