import { accreditations } from "@/src/content/accreditations";

export function AccreditationStrip() {
  return (
    <ul className="accreditation-strip" aria-label="Accreditation marks">
      {accreditations.map((mark) => (
        <li key={mark.label}>
          {mark.src ? (
            <img
              className="accreditation-strip__logo"
              src={mark.src}
              alt={mark.label}
            />
          ) : (
            <span className="accreditation-strip__chip">{mark.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
