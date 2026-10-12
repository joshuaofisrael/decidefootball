import type { Metadata } from "next";
import { StaticRedirect } from "@/components/StaticRedirect";
import { FIXTURE_WEEK } from "@/lib/fixtures";
import { WAIVER_DESK_PATH } from "@/lib/indexable-urls";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ week: `week-${FIXTURE_WEEK}` }];
}

export const metadata: Metadata = pageMetadata({
  path: WAIVER_DESK_PATH,
  title: "This week address has moved",
  description: "This address now points at the sample waiver radar.",
  indexation: { redirectStub: true },
});

export default function WaiverWeekRedirectPage() {
  return <StaticRedirect to={WAIVER_DESK_PATH} />;
}
