import { organizations } from "@/src/content/organizations";

import { OrgCard } from "./OrgCard";

export function OrganizationsMap() {
  const connector = organizations.find(
    (organization) => organization.role === "connector",
  );
  const groves = organizations.filter(
    (organization) => organization.role === "grove",
  );

  if (!connector) return null;

  return (
    <div
      id="story-start"
      className="organizations-map"
      aria-label="Organization directory"
    >
      <div className="organizations-map__branches" aria-hidden="true" />
      <div className="organizations-map__pair">
        {groves.slice(0, 2).map((organization) => (
          <OrgCard key={organization.id} organization={organization} />
        ))}
      </div>
      <OrgCard organization={connector} />
      <div className="organizations-map__pair">
        {groves.slice(2).map((organization) => (
          <OrgCard key={organization.id} organization={organization} />
        ))}
      </div>
    </div>
  );
}
