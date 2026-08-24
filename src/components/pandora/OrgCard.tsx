import Link from "next/link";

import type { Organization } from "@/src/content/organizations";

import { OrgMark } from "./OrgMark";

export function OrgCard({ organization }: { organization: Organization }) {
  const href = `/organizations/${organization.id}/`;

  return (
    <article
      id={organization.id}
      className={`org-node ${organization.role === "connector" ? "org-node--connector" : ""}`}
    >
      <Link
        className="org-node__link"
        href={href}
        aria-label={`${organization.name} details`}
      >
        <OrgMark organization={organization} decorative />
        <p className="org-node__abbr">{organization.abbr}</p>
      </Link>
    </article>
  );
}
