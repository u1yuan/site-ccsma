import Link from "next/link";

import type { Organization } from "@/src/content/organizations";

import { Bloom } from "../scroll/Bloom";
import { OrgMark } from "./OrgMark";

export function OrgCard({ organization }: { organization: Organization }) {
  const headingId = `${organization.id}-heading`;
  const isPlaceholder = organization.status === "placeholder";
  const href = `/organizations/${organization.id}/`;

  return (
    <section
      id={organization.id}
      className={`org-card ${organization.role === "connector" ? "org-card--connector" : ""}`}
      aria-labelledby={headingId}
    >
      <Bloom>
        <Link
          className="org-card__identity"
          href={href}
          aria-label={`${organization.name} details`}
        >
          <OrgMark organization={organization} decorative />
        </Link>
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
        {organization.status === "summary" ? (
          <p className="summary-badge org-card__provenance">
            Community description
          </p>
        ) : null}
        <Link className="org-card__identity" href={href}>
          <p className="org-card__abbr">{organization.abbr}</p>
          <h2 id={headingId}>{organization.name}</h2>
        </Link>
        {isPlaceholder ? (
          <p className="placeholder-state" role="status">
            <span aria-hidden="true">○</span>
            Content coming soon
          </p>
        ) : (
          <div className="org-card__body">
            <p>{organization.description}</p>
            {organization.mission ? (
              <div className="org-card__field">
                <p className="utility-label">Mission</p>
                <p>{organization.mission}</p>
              </div>
            ) : null}
            {organization.vision ? (
              <div className="org-card__field">
                <p className="utility-label">Vision</p>
                <p>{organization.vision}</p>
              </div>
            ) : null}
            {organization.motto ? (
              <div className="org-card__field">
                <p className="utility-label">Motto</p>
                <p>{organization.motto}</p>
              </div>
            ) : null}
            {organization.values?.length ? (
              <div className="org-card__field">
                <p className="utility-label">Core values</p>
                <ul className="org-card__values">
                  {organization.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {organization.links?.length ? (
              <ul className="org-card__links">
                {organization.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} rel="noreferrer" target="_blank">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </Bloom>
    </section>
  );
}
