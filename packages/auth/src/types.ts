export type AuthUser = {
  id: string;
  email?: string | null;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string | null;
  expiresAt?: number | null;
  user: AuthUser;
};

export type AuthRequestOptions = {
  accessToken?: string;
};

export type AuthSubscription = {
  unsubscribe: () => void;
};

export type AuthAdapter = {
  getCurrentUser: (options?: AuthRequestOptions) => Promise<AuthUser | null>;
  getSession: (options?: AuthRequestOptions) => Promise<AuthSession | null>;
  onAuthStateChange?: (callback: (event: string, session: AuthSession | null) => void) => AuthSubscription;
  signOut?: () => Promise<void>;
};
