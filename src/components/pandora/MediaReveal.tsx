"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { MediaItem } from "@/src/content/media";
import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

import { MediaGallery } from "./MediaGallery";

export function MediaReveal({
  title,
  items,
  children,
  previewOnHover = false,
}: {
  title: string;
  items: MediaItem[];
  children: ReactNode;
  previewOnHover?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const suppressReveal = useRef(false);

  const show = () => {
    if (suppressReveal.current) return;
    setOpen(true);
  };
  const hide = () => {
    if (!pinned) setOpen(false);
  };
  const closeAll = () => {
    suppressReveal.current = true;
    setPinned(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("keydown", onKey);
    if (pinned) closeRef.current?.focus();

    return () => document.removeEventListener("keydown", onKey);
  }, [open, pinned]);

  const isPreview = previewOnHover && !pinned;
  const panel = open ? (
    <div
      className={isPreview ? "media-preview" : "media-dialog"}
      role="dialog"
      aria-modal={isPreview ? undefined : true}
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
            onClick={closeAll}
          >
            Close
          </button>
        </div>
        <MediaGallery items={items} label={`${title} photos`} />
      </div>
    </div>
  ) : null;

  // The pinned modal must escape any transformed/overflow-clipped ancestor
  // (e.g. GlowTree's animated Pulse wrapper), so portal it to the body.
  const renderedPanel =
    panel && !isPreview && typeof document !== "undefined"
      ? createPortal(panel, document.body)
      : panel;

  return (
    <div
      ref={rootRef}
      className="media-reveal"
      onMouseEnter={previewOnHover ? show : undefined}
      onMouseLeave={
        previewOnHover
          ? () => {
              suppressReveal.current = false;
              hide();
            }
          : undefined
      }
      onBlur={
        previewOnHover
          ? (event) => {
              if (!rootRef.current?.contains(event.relatedTarget as Node)) {
                hide();
              }
            }
          : undefined
      }
    >
      <button
        ref={triggerRef}
        type="button"
        className="media-reveal__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setPinned(true);
          setOpen(true);
        }}
        onFocus={previewOnHover ? show : undefined}
      >
        {children}
      </button>
      {renderedPanel}
    </div>
  );
}
