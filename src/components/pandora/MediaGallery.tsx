import type { MediaItem } from "@/src/content/media";

import { MediaPlaceholder } from "./MediaPlaceholder";

export function MediaGallery({
  items,
  label,
}: {
  items: MediaItem[];
  label: string;
}) {
  if (!items.length) {
    return <MediaPlaceholder />;
  }

  return (
    <ul className="media-gallery" aria-label={label}>
      {items.map((item) => (
        <li key={item.src}>
          <img src={item.src} alt={item.alt} />
          {item.caption ? <p>{item.caption}</p> : null}
        </li>
      ))}
    </ul>
  );
}
