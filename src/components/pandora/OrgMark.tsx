import type { Organization } from "@/src/content/organizations";

export function OrgMark({
  organization,
  decorative = false,
}: {
  organization: Organization;
  decorative?: boolean;
}) {
  if (organization.logo) {
    return (
      <div className="org-card__mark">
        <img
          className="org-card__logo"
          src={organization.logo}
          alt={decorative ? "" : `${organization.name} logo`}
          aria-hidden={decorative || undefined}
        />
      </div>
    );
  }

  return (
    <div className="org-card__mark">
      <span className="org-card__monogram" aria-hidden="true">
        {organization.abbr}
      </span>
    </div>
  );
}
