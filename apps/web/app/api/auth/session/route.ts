import { NextResponse } from "next/server";
import { DEFAULT_ACCESS_COOKIE } from "@care-connect/auth/server";

type SessionRequest = {
  accessToken?: string;
  expiresAt?: number | null;
};

function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true;

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host;
    return originHost === host;
  } catch {
    return false;
  }
}

function getCookieOptions(expiresAt?: number | null) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const maxAge =
    typeof expiresAt === "number" && expiresAt > nowSeconds
      ? expiresAt - nowSeconds
      : undefined;

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  };
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "invalid origin" }, { status: 403 });
  }

  let payload: SessionRequest | null = null;
  try {
    payload = (await req.json()) as SessionRequest;
  } catch {
    payload = null;
  }

  if (!payload?.accessToken) {
    return NextResponse.json({ error: "accessToken required" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEFAULT_ACCESS_COOKIE, payload.accessToken, getCookieOptions(payload.expiresAt));
  return res;
}

export async function DELETE(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "invalid origin" }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEFAULT_ACCESS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return res;
}
