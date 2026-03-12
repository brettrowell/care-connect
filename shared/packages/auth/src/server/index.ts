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
  const accessToken = options?.accessToken;
  if (!accessToken) return null;

  const adapter = options?.adapter ?? createSupabaseAdapter(createServerClient());
  const user = await adapter.getCurrentUser({ accessToken });
  if (!user) return null;

  return {
    accessToken,
    refreshToken: null,
    expiresAt: null,
    user
  };
}

export type RequestLike = {
  headers?: Headers | Record<string, string | string[] | undefined>;
  cookies?: { get: (name: string) => { value: string } | undefined } | Record<string, string | undefined>;
};

export function getAccessTokenFromRequest(
  req: RequestLike,
  cookieName: string = DEFAULT_ACCESS_COOKIE
): string | undefined {
  const authorization = readHeader(req.headers, "authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const cookieToken = readCookie(req.cookies, cookieName);
  return cookieToken;
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
): string | undefined {
  if (!headers) return undefined;
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name) ?? undefined;
  }
  const key = name.toLowerCase();
  const record = headers as Record<string, string | string[] | undefined>;
  const value = record[key];
  if (Array.isArray(value)) return value[0] ?? undefined;
  return value ?? undefined;
}

function readCookie(
  cookies: RequestLike["cookies"],
  name: string
): string | undefined {
  if (!cookies) return undefined;
  if (typeof (cookies as { get: (key: string) => { value: string } | undefined }).get === "function") {
    return (cookies as { get: (key: string) => { value: string } | undefined }).get(name)?.value ?? undefined;
  }
  const record = cookies as Record<string, string | undefined>;
  return record[name] ?? undefined;
}
