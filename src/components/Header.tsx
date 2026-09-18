import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const links = [
  { href: "/start-sit/", label: "Start / sit" },
  { href: "/is-playing/", label: "Is playing" },
  { href: "/players/", label: "Players" },
  { href: "/week-3/rb-rankings/", label: "Rankings" },
  { href: "/waiver-wire/week-3/", label: "Waivers" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/about/", label: "About" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/">
          {SITE_NAME}
          <span>Fantasy decisions, not news</span>
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
