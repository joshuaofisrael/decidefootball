import type { Metadata } from "next";
import { StaticRedirect } from "@/components/StaticRedirect";
import { WAIVER_DESK_PATH } from "@/lib/indexable-urls";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: WAIVER_DESK_PATH,
  title: "This page has moved",
  description: "This address now points at the sample waiver radar.",
  indexation: { redirectStub: true },
});

export default function WaiverDeskRedirectPage() {
  return <StaticRedirect to={WAIVER_DESK_PATH} />;
}
