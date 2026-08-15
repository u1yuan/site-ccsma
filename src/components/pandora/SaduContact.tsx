import { sadu, saduSource } from "@/src/content/sadu";

export function SaduContact() {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <div>
        <p className="utility-label">End of descent / Contact</p>
        <h2 id="contact-heading">Find SADU</h2>
        <p>Use the official details below to reach the office.</p>
      </div>
      <address className="contact-block">
        <span>{sadu.contact.room}</span>
        <span>{sadu.contact.hours}</span>
        <span>{sadu.contact.trunkline}</span>
        <a href="mailto:sadu@feutech.edu.ph">{sadu.contact.email}</a>
        <span>{sadu.contact.address}</span>
      </address>
      <a
        className="text-link"
        href={saduSource.url}
        target="_blank"
        rel="noreferrer"
      >
        Verify on the official page
        <span aria-hidden="true"> ↗</span>
      </a>
    </section>
  );
}
