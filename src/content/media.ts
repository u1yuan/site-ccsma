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

// TODO(human): add entries as image files land in public/activities/<org-slug>/
export const activityMedia: Record<string, MediaItem[]> = {
  acm: [],
  aits: [],
  jpcs: [],
  prism: [],
  scc: [],
  sadu: [],
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
