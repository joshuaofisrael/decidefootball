import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb) => (
          <li key={crumb.path}>
            <Link href={crumb.path}>{crumb.name}</Link>
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </nav>
  );
}
