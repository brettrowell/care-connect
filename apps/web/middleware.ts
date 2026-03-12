import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUserFromRequest } from "@care-connect/auth/server";

const PROTECTED_PREFIXES = ["/app"];
const PUBLIC_PATHS = ["/", "/login", "/signup"];

function isAssetPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml")
  );
}

function isProtectedPath(pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) return false;
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAssetPath(pathname) || !isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const user = await getCurrentUserFromRequest(req);
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
