import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { BRAND_SENTENCE, SITE_CONTACT_EMAIL, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Contact";
const description =
  "Contact Joshua Israel Ventures LLC, the operator of Decide Football, at joshuaofisrael@gmail.com.";

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
      <p>
        Email: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
      </p>
      <p>Questions about {SITE_NAME} can be sent to that address.</p>
    </div>
  );
}
