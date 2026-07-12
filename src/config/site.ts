/**
 * Site-wide configuration.
 * Update this file whenever your personal details change.
 * All components and data files import from here — no scattered magic strings.
 */
export const siteConfig = {
  name: "Ketan Devraj",
  initials: "KD",
  title: "Computer Engineering Student",
  tagline: "Pune, India",
  description:
    "AI-powered applications, developer tools, and modern software — built by a final-year Computer Engineering student.",
  email: "ketandevraj2405@gmail.com",
  phone: "+91 7775856457",
  location: "Pune, India",
  github: "https://github.com/Ketannnn",
  linkedin: "https://www.linkedin.com/in/ketan-devraj-22a3ab317/",
  resumeUrl: "/resume.pdf",
  copyrightYear: new Date().getFullYear(),
} as const;
