export type MockType = "api-console" | "ai-fitness";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status?: string;
  features: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl: string;
  mockType: MockType;
}

export const projects: Project[] = [
  {
    id: "api-support-console",
    title: "API Support Console",
    subtitle:
      "A Flask-based console to automate testing and debugging of API endpoints.",
    features: [
      "Engineered a Flask-based console to automate testing and debugging of various API endpoints.",
      "Implemented robust GET/POST request handling and performed in-depth HTTP response analysis.",
      "Tracked and logged critical API issues, streamlining the debugging process.",
    ],
    stack: ["Python", "Flask", "SQLite", "HTML", "CSS"],
    githubUrl: "https://github.com/Ketannnn",
    mockType: "api-console",
  },
  {
    id: "ai-fitness-trainer",
    title: "AI-Based Fitness Trainer",
    subtitle:
      "An AI-powered system for personalized fitness guidance using Computer Vision and LLMs.",
    status: "In Progress",
    features: [
      "Designed an AI-powered system for personalized fitness guidance, leveraging Computer Vision and LLMs.",
      "Integrated pose estimation techniques (MediaPipe/OpenPose) to monitor body posture and analyze joint angles in real-time.",
      "Developed real-time voice feedback mechanisms for immediate exercise correction and guidance.",
    ],
    stack: ["Python", "MediaPipe/OpenPose", "Computer Vision", "LLM APIs"],
    githubUrl: "https://github.com/Ketannnn",
    mockType: "ai-fitness",
  },
];
