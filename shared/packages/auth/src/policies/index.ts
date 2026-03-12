import type { AuthUser } from "../types";

export function isAuthenticated(user: AuthUser | null): user is AuthUser {
  return Boolean(user?.id);
}

export function requireUser(user: AuthUser | null, message = "Authentication required"): AuthUser {
  if (!user) {
    throw new Error(message);
  }
  return user;
}
