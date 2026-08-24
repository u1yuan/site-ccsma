import type { ContentStatus, SourceAttribution } from "./types";

export interface Program {
  id: string;
  abbr: string;
  title: string;
  description: string;
  status: Extract<ContentStatus, "official">;
  flora: "crystal" | "mushroom" | "blossom" | "fern" | "berries" | "petals";
  // Optional "2-in-1" specialization tracks offered within the degree.
  specializations?: string[];
}

export const programsSource: SourceAttribution = {
  label: "FEU Tech CCSMA academics page",
  url: "https://www.feutech.edu.ph/academics/ccsma",
};

export const programs: Program[] = [
  {
    id: "computer-science",
    abbr: "BSCS",
    title: "Bachelor of Science in Computer Science",
    description:
      "Includes the study of computing concepts and theories, algorithmic foundations, and new developments in computing. The program prepares students to design and create algorithmically complex software and develop new and effective algorithms for solving computing problems. Graduates of this program can expect a successful and rewarding career in specification design, coding, and software testing. It also focuses on software engineering, database, and large-scale software.",
    status: "official",
    flora: "crystal",
    specializations: [
      "Data Science",
      "Artificial Intelligence",
      "Software Engineering",
    ],
  },
  {
    id: "information-technology",
    abbr: "BSIT",
    title: "Bachelor of Science in Information Technology",
    description:
      "The study of the use of computers and computer software to plan, install, customize, operate, manage, administer, and maintain information technology infrastructure. The program also deals with the study of design, development, and implementation of solutions that integrate information technology into businesses and organizations. It aims to prepare students to be IT professionals, well-versed in IT infrastructure development and administration, and experts in systems design and development for implementation in an organization.",
    status: "official",
    flora: "mushroom",
  },
  {
    id: "multimedia-arts",
    abbr: "BMMA",
    title: "Bachelor of Multimedia Arts",
    description:
      "The program aligns itself with the rapid convergence of media technologies and practices by developing conceptual, technical, aesthetic, and professional competencies for effective, critical, and innovative storytelling.",
    status: "official",
    flora: "blossom",
  },
  {
    id: "cybersecurity",
    abbr: "BSCY",
    title: "Bachelor of Science in Cybersecurity",
    description:
      "The program is designed to provide students with a comprehensive education in the principles and practices of cybersecurity, covering fundamental concepts of computer systems, networks, and software. As well as advanced topics in cybersecurity, including threat analysis, risk management, and incident response.",
    status: "official",
    flora: "fern",
  },
  {
    id: "digital-marketing-management",
    abbr: "BDMM",
    title: "Bachelor of Digital Marketing and Management",
    description:
      "The program focuses on developing students' skills in planning, designing, and executing digital marketing campaigns while ensuring adherence to ethical standards, data privacy, and sustainability.",
    status: "official",
    flora: "berries",
  },
  {
    id: "financial-technology-engineering",
    abbr: "BSFTE",
    title: "Bachelor of Science in Financial Technology Engineering",
    description:
      "This program integrates finance, technology, and engineering principles to develop cutting-edge financial solutions. It covers blockchain, artificial intelligence (AI) in finance, cybersecurity, data analytics, and financial systems engineering, preparing students to create secure, efficient, and innovative financial products.",
    status: "official",
    flora: "petals",
  },
];
