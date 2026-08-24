"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import type { MediaItem } from "@/src/content/media";
import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

import { MediaGallery } from "./MediaGallery";

export function MediaReveal({
  title,
  items,
  children,
}: {
  title: string;
  items: MediaItem[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const trigger = triggerRef.current;
    return () => trigger?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="media-reveal__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {open ? (
        <div
          className="media-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-motion-state={reduceMotion ? "static" : "animated"}
        >
          <div className="media-dialog__panel">
            <div className="media-dialog__header">
              <h2 id={titleId}>{title}</h2>
              <button
                ref={closeRef}
                type="button"
                className="media-dialog__close"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <MediaGallery items={items} label={`${title} photos`} />
          </div>
        </div>
      ) : null}
    </>
  );
}
