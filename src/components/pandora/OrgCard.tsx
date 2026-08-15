import type { Organization } from "@/src/content/organizations";

import { Bloom } from "../scroll/Bloom";

export function OrgCard({ organization }: { organization: Organization }) {
  const headingId = `${organization.id}-heading`;

  return (
    <section
      id={organization.id}
      className={`org-card ${organization.role === "connector" ? "org-card--connector" : ""}`}
      aria-labelledby={headingId}
    >
      <Bloom>
        <div className="org-card__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="utility-label">
          {organization.role === "connector"
            ? "Linking body"
            : "Connected grove"}
        </p>
        <p className="org-card__abbr">{organization.abbr}</p>
        <h2 id={headingId}>{organization.name}</h2>
        <p className="placeholder-state" role="status">
          <span aria-hidden="true">○</span>
          Content coming soon
        </p>
      </Bloom>
    </section>
  );
}
