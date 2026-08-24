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
        <ul className="directors-gallery__list">
          {items.map((item) => (
            <li key={item.src}>
              <figure className="directors-gallery__figure">
                <img src={item.src} alt={item.alt} />
                <figcaption>{item.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <MediaPlaceholder />
      )}
    </section>
  );
}
