"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Programs" },
  { href: "/organizations/", label: "Organizations" },
  { href: "/student-activities/", label: "Student Activities" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="CCSMA concept home">
          <span className="wordmark__mark" aria-hidden="true">
            C/
          </span>
          <span>
            <strong>CCSMA</strong>
            <small>Bio-digital campus</small>
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
