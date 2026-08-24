import { directors } from "@/src/content/media";

import { MediaPlaceholder } from "./MediaPlaceholder";

export function DirectorsGallery({ group }: { group: string }) {
  const items = directors[group] ?? [];

  return (
    <section
      className="directors-gallery"
      aria-labelledby={`${group}-directors`}
    >
      <p className="utility-label">Leadership</p>
      <h2 id={`${group}-directors`}>Directors</h2>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item.src}>
              <img src={item.src} alt={item.alt} />
              {item.name ? <p>{item.name}</p> : null}
              {item.role ? <p className="utility-label">{item.role}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <MediaPlaceholder />
      )}
    </section>
  );
}
