export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface DirectorItem {
  src: string;
  alt: string;
  // TODO(human): supply real names and titles — do not invent them in code
  name?: string;
  role?: string;
}

export function developmentProgramId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const activityMedia: Record<string, MediaItem[]> = {
  acm: [{ src: "/activities/acm/01.jpg", alt: "ACM student activity" }],
  aits: [{ src: "/activities/aits/01.jpg", alt: "AITS student activity" }],
  jpcs: [{ src: "/activities/jpcs/01.jpg", alt: "JPCS student activity" }],
  prism: [{ src: "/activities/prism/01.jpg", alt: "PRISM student activity" }],
  scc: [{ src: "/activities/scc/01.jpg", alt: "SCC student activity" }],
  sadu: [{ src: "/activities/sadu/01.jpg", alt: "SADU student activity" }],
};

// TODO(human): add entries as image files land in public/programs/<program-id>/
export const programIllustrations: Record<string, MediaItem[]> = {
  "holistic-development": [],
  "leadership-training-seminar": [],
  "efficiency-training": [],
  "sadu-sponsored-training-and-seminars": [],
  "rso-sponsored-seminars-and-trainings": [],
  "personality-enhancement": [],
  athletics: [],
};

// TODO(human): add entries as image files land in public/directors/<org-slug>/
export const directors: Record<string, DirectorItem[]> = {
  acm: [],
  aits: [],
  jpcs: [],
  prism: [],
  scc: [],
  sadu: [],
};
