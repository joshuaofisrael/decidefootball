import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { BRAND_SENTENCE, SITE_CONTACT_EMAIL, SITE_LEGAL_NAME, SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "Contact";
const description =
  "Contact Joshua Israel Ventures LLC, the operator of Decide Football, with the contact form or at joshuaofisrael@gmail.com.";

const PAGE_DATE = { lastModified: "2026-10-18" } as const;

/** FormSubmit relays each submission to the contact inbox by email. */
const CONTACT_FORM_ACTION = `https://formsubmit.co/${SITE_CONTACT_EMAIL}`;

export const metadata = pageMetadata({
  path: "/contact/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function ContactPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
      />
      <h1>Contact</h1>
      <p>{BRAND_SENTENCE}</p>
      <p>
        Operator: <strong>{SITE_LEGAL_NAME}</strong>
      </p>
      <p>Questions about {SITE_NAME} can be sent with the form below. All fields are required.</p>

      <form className="contact-form" action={CONTACT_FORM_ACTION} method="POST">
        <input type="hidden" name="_subject" value="Decide Football contact" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={absoluteUrl("/contact/thanks/")} />
        <p className="contact-honey" aria-hidden="true">
          <label>
            Leave this field empty
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" type="text" name="name" required maxLength={120} autoComplete="name" />
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" name="email" required maxLength={200} autoComplete="email" />
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" required rows={6} maxLength={5000} />
        <button className="btn" type="submit">
          Send message
        </button>
      </form>

      <p>
        Submissions are processed by FormSubmit and emailed to us. See the <a href="/privacy/">privacy policy</a>.
      </p>
      <p>
        You can also email <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
      </p>
      <p>{`Last updated: ${PAGE_DATE.lastModified}.`}</p>
    </div>
  );
}
