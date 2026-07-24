export type MockType = "ai-fitness";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status?: string;
  features: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl: string;
  /** Rendered as an interactive mock when screenshotUrl is absent */
  mockType?: MockType;
  /** If set, a real screenshot is shown instead of the mock component */
  screenshotUrl?: string;
}

export const projects: Project[] = [
  {
    id: "api-support-console",
    title: "API Support Console",
    subtitle:
      "A full-stack REST API testing tool — send GET and POST requests from the browser, inspect formatted responses, measure latency, and keep a persistent SQLite history.",
    features: [
      "Built a browser-based REST API tester supporting GET and POST requests with real-time formatted JSON responses and inline error messages.",
      "Persisted the full request history in SQLite — users can review past calls and clear history on demand without losing session context.",
      "Measured and displayed API response time per request; handles network errors, timeouts, and invalid JSON responses gracefully.",
    ],
    stack: ["Python", "Flask", "SQLite", "JavaScript", "HTML", "CSS", "Requests", "Render"],
    liveUrl: "https://api-support-console.onrender.com/",
    githubUrl: "https://github.com/Ketannnn/api-support-console",
    // Real screenshot replaces the mock UI for this project
    screenshotUrl: "/images/api-support-console.webp",
  },
  {
    id: "ai-fitness-trainer",
    title: "AI-Powered Fitness Assistant",
    subtitle:
      "Collaborative final-year project — AI platform combining computer vision and LLMs for personalised workout plans, real-time pose detection, and diet recommendations.",
    status: "In Progress",
    features: [
      "Built the React + TypeScript frontend: authentication flow, responsive dashboard, and integration with FastAPI backend services.",
      "Real-time pose detection using MediaPipe/TensorFlow with exercise rep counting and voice-enabled AI assistant feedback.",
      "Personalised workout and diet recommendations driven by LLM — progress tracked per user across sessions.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "MediaPipe", "TensorFlow", "OpenCV", "SQLite", "LLM"],
    // No public deployment — Live Demo button intentionally omitted
    githubUrl: "https://github.com/yashchaugule05/fit-ai",
    screenshotUrl: "/images/ai-fitness-trainer.webp",
  },
];
