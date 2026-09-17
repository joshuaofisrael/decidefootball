"use client";

import { useEffect, useRef } from "react";
import { adsConfigured, getAdSlotId, getAdsenseClientId, type AdPlacement } from "@/lib/ads";
import { useConsent } from "./useConsent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ placement }: { placement: AdPlacement }) {
  if (!adsConfigured()) return null;
  return <AdSlotInner placement={placement} />;
}

function AdSlotInner({ placement }: { placement: AdPlacement }) {
  const { choice } = useConsent();
  const client = getAdsenseClientId();
  const slot = getAdSlotId(placement);
  const pushed = useRef(false);

  const canFill = Boolean(client && slot && choice === "accept");

  useEffect(() => {
    if (!canFill || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blockers or a missing script must not break decision pages.
    }
  }, [canFill]);

  return (
    <aside className={`ad-slot ad-slot-${placement}`} aria-label="Advertisement">
      <p className="ad-label">Advertisement</p>
      {canFill ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client ?? undefined}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <p className="ad-placeholder">
          {choice === "reject"
            ? "Ad unit reserved. Script not loaded (consent rejected)."
            : choice === "unset"
              ? "Ad unit reserved. Script waits for non-essential consent."
              : "Ad unit reserved. Slot ID not set for this placement."}
        </p>
      )}
    </aside>
  );
}
