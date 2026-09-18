import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const links = [
  { href: "/start-sit/", label: "Decide" },
  { href: "/slate/", label: "Slate" },
  { href: "/watchlist/", label: "Watch" },
  { href: "/players/", label: "Club" },
  { href: "/waiver-wire/week-3/", label: "Radar" },
  { href: "/methodology/", label: "Method" },
  { href: "/about/", label: "About" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/">
          {SITE_NAME}
          <span>The press box, not the recap</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="nav-toggle">
          <summary>Menu</summary>
          <nav className="nav-panel" aria-label="Primary mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
