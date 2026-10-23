import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { BottomNav } from "@/components/BottomNav";
import { CloudflareBeacon } from "@/components/CloudflareBeacon";
import { ConsentStub } from "@/components/ConsentStub";
import { ConsentProvider } from "@/components/useConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ADSENSE_HEAD_SRC, ADSENSE_PUBLISHER_CLIENT, adsConfigured } from "@/lib/ads";
import { getComplianceGate, INDEPENDENT_MICROCOPY } from "@/lib/compliance";
import { decideIndexation } from "@/lib/indexation";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { display, mono, sans } from "./fonts";
import "./globals.css";

const defaultIndex = decideIndexation({ sourceClass: "FIXTURE" });
const showAds = adsConfigured();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME}: independent fantasy decisions`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Start or sit. Is he playing. Waivers and rankings from structured estimates. Independent desk. Not NFL-affiliated. Not gambling.",
  applicationName: SITE_NAME,
  robots: defaultIndex.robots,
  other: { "google-adsense-account": ADSENSE_PUBLISHER_CLIENT },
  verification: { google: "sZ1l2pwWVsYn45xUk4e6ehpvyDBpikVSNKNdhUKisKw" },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gate = getComplianceGate();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script async src={ADSENSE_HEAD_SRC} crossOrigin="anonymous" />
      </head>
      <body>
        <ConsentProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <Header />
          {showAds ? (
            <div className="ad-layout-wrap">
              <AdSlot placement="layout" />
            </div>
          ) : null}
          {showAds ? (
            <div className="page-shell with-ads">
              <main id="content">{children}</main>
              <AdSlot placement="sidebar" />
            </div>
          ) : (
            <main id="content">{children}</main>
          )}
          {showAds ? (
            <div className="ad-layout-wrap">
              <AdSlot placement="footer" />
            </div>
          ) : null}
          <Footer />
          <BottomNav />
          <ConsentStub />
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <p className="visually-hidden">
            {INDEPENDENT_MICROCOPY} Compliance gate {gate}.
          </p>
        </ConsentProvider>
        <CloudflareBeacon />
      </body>
    </html>
  );
}
