"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

const links = [
  { href: "/", label: "Home" },
  { href: "/programs/", label: "Programs" },
  { href: "/organizations/", label: "Organizations" },
  { href: "/student-activities/", label: "Student Activities" },
];

function BrandMark() {
  return (
    <svg
      className="wordmark__mark"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="wordmark__seed" cx="16" cy="20" r="4" />
      <path
        className="wordmark__sprout"
        d="M16 17C16 12 13 8 8 7C11 11 13 13 16 17Z"
      />
      <path
        className="wordmark__sprout"
        d="M16 17C16 11 20 8 25 8C21 12 19 14 16 17Z"
      />
      <path className="wordmark__stem" d="M16 20V27" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled ? "true" : "false"}
      data-motion-state={reduceMotion ? "static" : "animated"}
    >
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="CCSMA concept home">
          <BrandMark />
          <span>
            <strong>CCSMA</strong>
            <small>Computer Studies &amp; Multimedia Arts</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.slice(0, -1));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
