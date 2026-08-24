export interface AccreditationMark {
  label: string;
  // Set to /logos/accreditation/<file>.png only after the PNG is in public/.
  src?: string;
}

// TODO(human): set src when the matching PNG lands in public/logos/accreditation/
export const accreditations: AccreditationMark[] = [
  { label: "PAASCU" },
  { label: "PICAB" },
  { label: "Cisco" },
  { label: "SAP" },
  { label: "Oracle Academy" },
  { label: "MIE" },
  { label: "AutoCAD" },
];
