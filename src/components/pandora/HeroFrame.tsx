import type { ReactNode } from "react";

export function HeroFrame({
  eyebrow,
  title,
  intro,
  visual,
  children,
  mark,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  visual: ReactNode;
  children?: ReactNode;
  mark?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`route-hero ${className}`}
      aria-labelledby="route-heading"
    >
      <div className="route-hero__grid" aria-hidden="true" />
      <div className="route-hero__stars" aria-hidden="true" />
      <div className="route-hero__content">
        {mark}
        <p className="utility-label">{eyebrow}</p>
        <h1 id="route-heading">{title}</h1>
        <p className="route-hero__intro">{intro}</p>
        {children}
      </div>
      <div className="route-hero__visual">{visual}</div>
      <a className="descent-cue" href="#story-start">
        <span>Descend</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
