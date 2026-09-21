import { absoluteUrl, getSiteUrl, SITE_LEGAL_NAME, SITE_NAME } from "./site";

export interface Crumb {
  name: string;
  path: string;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: getSiteUrl(),
    description:
      "Independent fantasy football decision information. Not affiliated with the NFL or its member clubs.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_LEGAL_NAME,
    },
  };
}

export function webPageJsonLd(args: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_LEGAL_NAME,
    },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${getSiteUrl()}${crumb.path.endsWith("/") ? crumb.path : `${crumb.path}/`}`,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
