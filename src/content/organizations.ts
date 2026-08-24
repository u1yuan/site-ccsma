import type { ContentStatus, SourceAttribution } from "./types";

export interface OrgLink {
  label: string;
  url: string;
}

export interface Organization {
  id: string;
  abbr: string;
  name: string;
  status: ContentStatus;
  role: "grove" | "connector";
  description: string;
  mission?: string;
  vision?: string;
  motto?: string;
  values?: string[];
  links?: OrgLink[];
  // Optional path under /logos/orgs/, e.g. "/logos/orgs/acm.png".
  // Leave unset until the human drops the PNG — the card then shows a monogram.
  logo?: string;
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
    name: "Association for Computing Machinery — FEU Tech Student Chapter",
    status: "summary",
    role: "grove",
    description:
      "Driven by innovation and united by passion, the FEU Tech ACM Student Chapter is a recognized student organization that stands as the mother organization of the Computer Science department of the institution and the Philippines' second internationally accredited ACM student chapter — empowering students to explore their passion for technology, spark innovation, and shape the future, one line of code at a time.",
    mission:
      "Organized and operated exclusively for educational and scientific purposes: to promote increased knowledge of and greater interest in the science, design, development, construction, languages, management, and applications of modern computing; to foster greater interest in computing and its applications; and to provide a means of communication between persons interested in computing.",
    vision:
      "To help students become future-ready and grow both academically and personally by creating platforms that develop technical skills, foster innovation, and build confidence in real-world applications — being the voice of the students, opening opportunities inside and outside the school, and growing ACM as a strong, supportive community of learners and future professionals.",
    values: ["Aptitude", "Competence", "Magnanimity"],
  },
  {
    id: "aits",
    abbr: "AITS",
    name: "Alliance of Information Technology Students",
    status: "summary",
    role: "grove",
    description:
      "The Alliance of Information Technology Students (AITS) is the official academic organization for IT students at the FEU Institute of Technology. Established in 2014, AITS creates an inclusive space for growth by offering technical seminars, coding challenges, and peer-led tutorials. Driven by its mission to empower student growth and its vision to foster a passion-driven IT community, the organization shapes future-ready tech leaders while upholding the university values of Fortitude, Excellence, and Uprightness.",
  },
  {
    id: "jpcs",
    abbr: "JPCS",
    name: "Junior Philippine Computer Society — FEU Tech",
    status: "summary",
    role: "grove",
    description:
      "The Junior Philippine Computer Society – FEU Tech (JPCS–FEU Tech) is the student chapter of the national Philippine Computer Society. Recognized as one of the oldest student organizations at the FEU Institute of Technology, it serves students in IT, Computer Science, Multimedia Arts, and Engineering, bridging classroom knowledge, industry standards, and emerging technologies through real-world networking, hackathons, and corporate partnerships.",
    mission:
      "To enhance the knowledge, leadership, and technical skills of the youth in Information and Communication Technology (ICT), providing the critical, complementary real-life experiences needed to shape students into world-class IT professionals.",
    vision:
      "To bridge academic knowledge with industry demand, building a deeply connected community where students and industry partners actively collaborate on technological advancements.",
  },
  {
    id: "prism",
    abbr: "PRISM",
    name: "Pioneers of Relentless and Innovative Storytellers in Multimedia Arts",
    status: "summary",
    role: "grove",
    description:
      "The Pioneers of Relentless and Innovative Storytellers in Multimedia Arts (PRISM) is the official academic organization of the Multimedia Arts Department at the FEU Institute of Technology. Serving students majoring in animation and digital film, PRISM is a creative hub that connects freshmen and senior student-artists — helping them navigate their art journeys, master creative tools, and showcase visual storytelling.",
    mission:
      "Empowering multimedia arts students to push creative boundaries and master digital landscapes across graphic design, photography, video, and animation.",
    vision: "Fostering an inventive, highly collaborative artistic ecosystem.",
    motto: "Beyond Mastery, Magnifying Artistry",
  },
  {
    id: "scc",
    abbr: "SCC",
    name: "Student Coordinating Council",
    status: "summary",
    role: "connector",
    description:
      "The FEU Tech Student Coordinating Council (SCC) is the highest governing student body and the official student representative at the FEU Institute of Technology. Run by student leaders, it serves as the voice of the student body — bridging the gap between the university administration and the learners, and overseeing the Recognized Student Organizations on campus.",
    mission:
      "To foster a progressive campus environment where critical thinking prevails, uniting the student population to assert student rights and systematically address welfare concerns.",
    vision:
      "To build an empowered community of principled servant leaders through student-led activities, leadership initiatives, and civic service projects.",
    motto: "Serve. Lead. Excel.",
  },
];
