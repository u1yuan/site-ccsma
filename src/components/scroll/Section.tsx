import type { ReactNode } from "react";

import { Bloom } from "./Bloom";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className={`story-section ${className}`}
      aria-labelledby={headingId}
    >
      <Bloom>
        {eyebrow ? <p className="utility-label">{eyebrow}</p> : null}
        <h2 id={headingId}>{title}</h2>
        {children}
      </Bloom>
    </section>
  );
}
