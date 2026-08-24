import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DirectorsGallery } from "@/src/components/pandora/DirectorsGallery";
import { MediaGallery } from "@/src/components/pandora/MediaGallery";
import { OrgMark } from "@/src/components/pandora/OrgMark";
import { activityMedia } from "@/src/content/media";
import { organizations } from "@/src/content/organizations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return organizations.map((organization) => ({ slug: organization.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const organization = organizations.find((entry) => entry.id === slug);
  if (!organization) return { title: "Organization" };

  const description =
    organization.description.split(/(?<=[.!?])\s/)[0] ??
    organization.description;

  return {
    title: organization.name,
    description,
  };
}

export default async function OrganizationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const organization = organizations.find((entry) => entry.id === slug);
  if (!organization) notFound();

  return (
    <main id="main-content" className="org-detail">
      <Link className="text-link org-detail__back" href="/organizations/">
        Back to all organizations
      </Link>
      <header className="org-detail__header">
        <OrgMark organization={organization} />
        <p className="utility-label">
          {organization.role === "connector"
            ? "Linking body"
            : "Connected grove"}
        </p>
        {organization.status === "summary" ? (
          <p className="summary-badge">Community description</p>
        ) : null}
        <p className="org-card__abbr">{organization.abbr}</p>
        <h1>{organization.name}</h1>
      </header>
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
      <section
        className="org-detail__gallery"
        aria-labelledby="activity-photos"
      >
        <p className="utility-label">Field notes</p>
        <h2 id="activity-photos">Activity photos</h2>
        <MediaGallery
          items={activityMedia[organization.id] ?? []}
          label={`${organization.abbr} activity photos`}
        />
      </section>
      <DirectorsGallery group={organization.id} />
    </main>
  );
}
