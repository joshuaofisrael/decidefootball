"use client";

import { adsConfigured } from "@/lib/ads";
import { useConsent } from "./useConsent";

export function ConsentStub() {
  const { choice, save } = useConsent();
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const adsOn = adsConfigured();
  const loadGa = Boolean(ga4 && choice === "accept");

  return (
    <>
      {choice === "unset" ? (
        <div className="consent" role="dialog" aria-label="Non-essential consent">
          <div className="consent-inner">
            <p>
              {adsOn
                ? "Analytics and advertising stay off until you choose. Ad scripts do not load without this consent."
                : "Analytics are off until you choose. No advertising pixels are loaded in this build."}{" "}
              Vendor list is not finalized <span className="flag">NEED JOSHUA INPUT</span>.
            </p>
            <div>
              <button type="button" className="btn" onClick={() => save("reject")}>
                Reject
              </button>{" "}
              <button type="button" className="btn secondary" onClick={() => save("accept")}>
                {adsOn ? "Accept analytics and ads" : "Accept analytics"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {loadGa ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
