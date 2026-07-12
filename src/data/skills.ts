export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    skills: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "data-tools",
    label: "Data Tools",
    skills: ["SQL & Databases", "MS Excel", "Power BI"],
  },
  {
    id: "languages",
    label: "Languages",
    skills: ["English", "Hindi", "Marathi"],
  },
];
