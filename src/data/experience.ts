export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  /** Human-readable date range shown in the UI */
  period: string;
  /** True = shown with the "Current" badge */
  current: boolean;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "devtechie",
    title: "Junior Web Developer",
    company: "DevTechie.com",
    location: "Pune",
    period: "February 2025 – April 2025",
    current: false,
    bullets: [
      "Developed and maintained front-end components for web pages using HTML and CSS.",
      "Implemented responsive design concepts and optimized UI structuring techniques for cross-browser compatibility.",
      "Managed and contributed to technical documentation and core development tasks.",
    ],
  },
  {
    id: "wisdom-sprouts",
    title: "Cybersecurity Intern",
    company: "Wisdom Sprouts IT Training Hub",
    location: "Pune",
    period: "December 2024 – February 2025",
    current: false,
    bullets: [
      "Developed and implemented an IDOR Vulnerability Lab for practical web security testing, simulating real-world attack vectors.",
      "Applied and mastered industry-standard web application security concepts and specialized testing tools.",
    ],
  },
];
