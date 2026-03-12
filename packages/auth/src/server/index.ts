import { createServerClient } from "@care-connect/supabase";
import { createSupabaseAdapter } from "../adapters/supabase";
import type { AuthAdapter, AuthSession, AuthUser } from "../types";

export const DEFAULT_ACCESS_COOKIE = "cc-access-token";

export type ServerAuthOptions = {
  accessToken?: string;
  adapter?: AuthAdapter;
};

export async function getCurrentUser(options?: ServerAuthOptions): Promise<AuthUser | null> {
  const adapter = options?.adapter ?? createSupabaseAdapter(createServerClient());
  return adapter.getCurrentUser({ accessToken: options?.accessToken });
}

export async function getSession(options?: ServerAuthOptions): Promise<AuthSession | null> {
  const adapter = options?.adapter ?? createSupabaseAdapter(createServerClient());
  return adapter.getSession({ accessToken: options?.accessToken });
}

export type RequestLike = {
  headers?: Headers | Record<string, string | string[] | undefined>;
  cookies?: { get: (name: string) => { value: string } | undefined } | Record<string, string | undefined>;
};

export function getAccessTokenFromRequest(
  req: RequestLike,
  cookieName: string = DEFAULT_ACCESS_COOKIE
): string | null {
  const authorization = readHeader(req.headers, "authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const cookieToken = readCookie(req.cookies, cookieName);
  return cookieToken ?? null;
}

export async function getCurrentUserFromRequest(
  req: RequestLike,
  options?: Omit<ServerAuthOptions, "accessToken"> & { cookieName?: string }
) {
  const accessToken = getAccessTokenFromRequest(req, options?.cookieName);
  return getCurrentUser({ accessToken, adapter: options?.adapter });
}

function readHeader(
  headers: RequestLike["headers"],
  name: string
): string | null {
  if (!headers) return null;
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name);
  }
  const key = name.toLowerCase();
  const record = headers as Record<string, string | string[] | undefined>;
  const value = record[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function readCookie(
  cookies: RequestLike["cookies"],
  name: string
): string | null {
  if (!cookies) return null;
  if (typeof (cookies as { get: (key: string) => { value: string } | undefined }).get === "function") {
    return (cookies as { get: (key: string) => { value: string } | undefined }).get(name)?.value ?? null;
  }
  const record = cookies as Record<string, string | undefined>;
  return record[name] ?? null;
}
