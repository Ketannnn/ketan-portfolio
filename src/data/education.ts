export interface EducationItem {
  id: string;
  institution: string;
  shortName: string;
  degree: string;
  field: string;
  cgpa: string;
  years: string;
  location: string;
}

export const education: EducationItem[] = [
  {
    id: "dypiemr",
    institution:
      "Dr. D. Y. Patil Institute of Engineering, Management & Research",
    shortName: "DYPIEMR, Akurdi",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Engineering",
    cgpa: "7.06",
    years: "2022 – 2026",
    location: "Akurdi, Pune",
  },
];
