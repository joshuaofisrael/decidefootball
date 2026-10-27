"use client";

import { useConsent } from "./useConsent";

/** Accept / decline control. Rendered on the privacy policy and the cookie notice. */
export function ConsentChoices() {
  const { choice, ready, save } = useConsent();
  const label = choice === "accept" ? "Accepted" : choice === "reject" ? "Declined" : "Not set";

  return (
    <section id="analytics-choice" className="consent-choices" aria-labelledby="analytics-choice-title">
      <h2 id="analytics-choice-title">Your analytics choice</h2>
      <p>
        Accept to let Google Analytics 4 load and use cookies on this device. Decline to keep it
        off. The choice is stored in local storage as <code>df_consent</code>. You can change it
        here later.
      </p>
      <p aria-live="polite">{`Saved choice on this device: ${ready ? label : "Not set"}.`}</p>
      <div>
        <button
          type="button"
          className="btn"
          onClick={() => save("reject")}
          aria-pressed={ready && choice === "reject"}
        >
          Decline
        </button>{" "}
        <button
          type="button"
          className="btn secondary"
          onClick={() => save("accept")}
          aria-pressed={ready && choice === "accept"}
        >
          Accept
        </button>
      </div>
    </section>
  );
}
