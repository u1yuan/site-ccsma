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
      className="solar-system"
      aria-label="Organization directory"
    >
      <div className="solar-system__field" aria-hidden="true" />

      {/* SCC — the connecting body at the centre */}
      <div className="solar-system__sun">
        <OrgCard organization={connector} />
      </div>

      {/* The four grove organizations orbit as logo planets */}
      {groves.map((organization, index) => (
        <div
          key={organization.id}
          className={`orbit-wrap orbit-wrap--${index + 1}`}
        >
          <div className="orbit">
            <div className="planet">
              <div className="planet__body">
                <OrgCard organization={organization} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
