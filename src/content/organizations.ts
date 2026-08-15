import type { ContentStatus, SourceAttribution } from "./types";

export interface Organization {
  id: string;
  abbr: string;
  name: string;
  status: Extract<ContentStatus, "placeholder">;
  role: "grove" | "connector";
}

export const organizationsSources: SourceAttribution[] = [
  {
    label: "FEU Tech recognized student organizations list",
    url: "https://www.feutech.edu.ph/campus_life/so",
  },
  {
    label: "FEU Tech CCSMA academics page",
    url: "https://www.feutech.edu.ph/academics/ccsma",
  },
];

export const organizations: Organization[] = [
  {
    id: "acm",
    abbr: "ACM",
    name: "Association for Computing Machinery",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "aits",
    abbr: "AITS",
    name: "Alliance of Information Technology Students",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "jpcs",
    abbr: "JPCS",
    name: "Junior Philippine Computer Society",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "prism",
    abbr: "PRISM",
    name: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts",
    status: "placeholder",
    role: "grove",
  },
  {
    id: "scc",
    abbr: "SCC",
    name: "Student Coordinating Council",
    status: "placeholder",
    role: "connector",
  },
];
