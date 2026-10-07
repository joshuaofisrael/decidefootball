import Link from "next/link";
import { INDEPENDENT_MICROCOPY } from "@/lib/compliance";
import { SITE_LEGAL_NAME, SITE_YEAR } from "@/lib/site";

const legal = [
  { href: "/about/", label: "About" },
  { href: "/guide/", label: "Guides" },
  { href: "/guide/start-sit/", label: "Start/sit guide" },
  { href: "/guide/add-drop/", label: "Add/drop guide" },
  { href: "/guide/toss-up/", label: "Toss-up tool" },
  { href: "/guide/certainty/", label: "Certainty tool" },
  { href: "/guide/waiver-radar/", label: "Waiver radar guide" },
  { href: "/guide/listed-status/", label: "Injury designations" },
  { href: "/guide/rankings/", label: "Rankings guide" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/cookies/", label: "Cookies" },
  { href: "/methodology/", label: "Methodology" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-nav" aria-label="Legal">
          {legal.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p>{INDEPENDENT_MICROCOPY}</p>
        <p className="owner-line">
          {`Operated by ${SITE_LEGAL_NAME}.`}
          <br />© {SITE_YEAR} {SITE_LEGAL_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
