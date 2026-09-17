"use client";

import { useEffect, useState } from "react";

const KEY = "df_consent";

type Choice = "unset" | "accept" | "reject";

export function ConsentStub() {
  const [choice, setChoice] = useState<Choice>("unset");
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "accept" || stored === "reject") setChoice(stored);
  }, []);

  function save(next: Exclude<Choice, "unset">) {
    window.localStorage.setItem(KEY, next);
    setChoice(next);
  }

  const loadGa = Boolean(ga4 && choice === "accept");

  return (
    <>
      {choice === "unset" ? (
        <div className="consent" role="dialog" aria-label="Analytics consent">
          <div className="consent-inner">
            <p>
              Analytics are off until you choose. Vendor is not finalized{" "}
              <span className="flag">NEED JOSHUA INPUT</span>. No advertising pixels.
            </p>
            <div>
              <button type="button" className="btn" onClick={() => save("reject")}>
                Reject
              </button>{" "}
              <button type="button" className="btn secondary" onClick={() => save("accept")}>
                Accept analytics
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
