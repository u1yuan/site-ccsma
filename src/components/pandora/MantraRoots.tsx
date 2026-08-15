import { sadu } from "@/src/content/sadu";

import { Bloom } from "../scroll/Bloom";

export function MantraRoots() {
  return (
    <section className="mantra-section" aria-labelledby="mantra-heading">
      <div className="mantra-section__header">
        <p className="utility-label">The mantra / Editorial summaries</p>
        <h2 id="mantra-heading">Three living roots</h2>
      </div>
      <div className="mantra-roots">
        {sadu.mantras.map((mantra, index) => (
          <Bloom className="mantra-root" key={mantra.label}>
            <span className="mantra-root__line" aria-hidden="true" />
            <span className="mantra-root__index" aria-hidden="true">
              0{index + 1}
            </span>
            <p className="utility-label">{mantra.label}</p>
            <h3>{mantra.headline}</h3>
            <p>{mantra.summary}</p>
            <span className="summary-badge">Editorial summary</span>
          </Bloom>
        ))}
      </div>
    </section>
  );
}
