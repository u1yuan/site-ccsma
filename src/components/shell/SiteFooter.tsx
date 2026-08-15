import { organizationsSources } from "@/src/content/organizations";
import { programsSource } from "@/src/content/programs";
import { saduSource } from "@/src/content/sadu";

import { SourceLinks } from "./SourceLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="utility-label">CCSMA field notes / v0</p>
          <p className="footer-intro">
            Official page copy is reproduced for educational concept purposes
            and linked to its source.
          </p>
        </div>
        <SourceLinks
          sources={[programsSource, ...organizationsSources, saduSource]}
        />
        <aside
          className="disclaimer"
          aria-label="Unofficial concept disclaimer"
        >
          <span aria-hidden="true">◇</span>
          <div>
            <p className="utility-label">Unofficial concept</p>
            <p>
              This site is an independent design concept. It is not endorsed by,
              affiliated with, or approved by FEU Institute of Technology.
            </p>
          </div>
        </aside>
      </div>
    </footer>
  );
}
