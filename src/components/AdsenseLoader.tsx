"use client";

import Script from "next/script";
import { adsConfigured, getAdsenseClientId } from "@/lib/ads";
import { useConsent } from "./useConsent";

export function AdsenseLoader() {
  if (!adsConfigured()) return null;
  return <AdsenseLoaderInner />;
}

function AdsenseLoaderInner() {
  const { choice } = useConsent();
  const client = getAdsenseClientId();
  if (choice !== "accept" || !client) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
