import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Thanks for your message";
const description =
  "Your message to Decide Football, a brand of Joshua Israel Ventures LLC, was sent through the contact form.";

const PAGE_DATE = { lastModified: "2026-10-18" } as const;

export const metadata = pageMetadata({
  path: "/contact/thanks/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function ContactThanksPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
          { name: "Thanks", path: "/contact/thanks/" },
        ]}
      />
      <h1>Thanks for your message</h1>
      <p>{`Your message was sent to ${SITE_LEGAL_NAME}, the operator of ${SITE_NAME}. We read every message and reply by email when a reply is needed.`}</p>
      <p>
        <Link href="/">Back to {SITE_NAME}</Link> or <Link href="/contact/">send another message</Link>.
      </p>
      <p>{`Last updated: ${PAGE_DATE.lastModified}.`}</p>
    </div>
  );
}
