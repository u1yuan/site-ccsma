import type { SourceAttribution } from "@/src/content/types";

export function SourceLinks({ sources }: { sources: SourceAttribution[] }) {
  return (
    <div className="source-links">
      <p className="utility-label">Source attribution</p>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
