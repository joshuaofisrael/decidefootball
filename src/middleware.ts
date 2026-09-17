import { NextResponse, type NextRequest } from "next/server";
import { resolvePair } from "@/lib/data";

function canonicalPairRedirect(req: NextRequest, kind: "start-sit" | "add-drop") {
  const match = req.nextUrl.pathname.match(
    kind === "start-sit" ? /^\/start-sit\/([^/]+)\/?$/ : /^\/add-drop\/([^/]+)\/?$/,
  );
  if (!match?.[1] || match[1] === "") return null;
  const resolved = resolvePair(match[1]);
  if (!resolved || resolved.isCanonical) return null;
  const url = req.nextUrl.clone();
  url.pathname = `/${kind}/${resolved.left.slug}-vs-${resolved.right.slug}/`;
  return NextResponse.redirect(url, 301);
}

export function middleware(req: NextRequest) {
  return (
    canonicalPairRedirect(req, "start-sit") ??
    canonicalPairRedirect(req, "add-drop") ??
    NextResponse.next()
  );
}

export const config = {
  matcher: ["/start-sit/:path*", "/add-drop/:path*"],
};
