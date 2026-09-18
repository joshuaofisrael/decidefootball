import Link from "next/link";

const items = [
  { href: "/", label: "Desk" },
  { href: "/start-sit/", label: "Decide" },
  { href: "/slate/", label: "Slate" },
  { href: "/watchlist/", label: "Watch" },
  { href: "/players/", label: "Club" },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
