(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__ed2e4cd2._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/care-connect/packages/supabase/src/env.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readEnv",
    ()=>readEnv
]);
function readEnv(key) {
    const env = globalThis.process?.env;
    return env?.[key];
}
}),
"[project]/care-connect/packages/supabase/src/client/index.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBrowserClient",
    ()=>createBrowserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/care-connect/node_modules/.pnpm/@supabase+supabase-js@2.99.0/node_modules/@supabase/supabase-js/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/env.ts [middleware-edge] (ecmascript)");
;
;
function createBrowserClient(env) {
    const url = env?.url ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("NEXT_PUBLIC_SUPABASE_URL") ?? "";
    const anonKey = env?.anonKey ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "";
    if (!url || !anonKey) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
}
}),
"[project]/care-connect/packages/supabase/src/server/index.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerClient",
    ()=>createServerClient,
    "createServerClientWithAccessToken",
    ()=>createServerClientWithAccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/care-connect/node_modules/.pnpm/@supabase+supabase-js@2.99.0/node_modules/@supabase/supabase-js/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/env.ts [middleware-edge] (ecmascript)");
;
;
function createServerClient(env) {
    const url = env?.url ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_URL") ?? "";
    const anonKey = env?.anonKey ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_ANON_KEY") ?? "";
    if (!url || !anonKey) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
}
function createServerClientWithAccessToken(options, env) {
    const url = env?.url ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_URL") ?? "";
    const anonKey = env?.anonKey ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_ANON_KEY") ?? "";
    if (!url || !anonKey) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${options.accessToken}`
            }
        }
    });
}
}),
"[project]/care-connect/packages/supabase/src/admin/index.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/care-connect/node_modules/.pnpm/@supabase+supabase-js@2.99.0/node_modules/@supabase/supabase-js/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/env.ts [middleware-edge] (ecmascript)");
;
;
function createAdminClient(env) {
    const url = env?.url ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_URL") ?? "";
    const serviceRoleKey = env?.serviceRoleKey ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$env$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readEnv"])("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!url || !serviceRoleKey) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$99$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, serviceRoleKey, {
        auth: {
            persistSession: false
        }
    });
}
}),
"[project]/care-connect/packages/supabase/src/index.ts [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$client$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/client/index.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/server/index.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$admin$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/admin/index.ts [middleware-edge] (ecmascript)");
;
;
;
}),
"[project]/care-connect/packages/auth/src/adapters/supabase.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseAdapter",
    ()=>createSupabaseAdapter
]);
function toAuthUser(user) {
    if (!user) return null;
    return {
        id: user.id,
        email: user.email
    };
}
function toAuthSession(session) {
    if (!session) return null;
    const user = toAuthUser(session.user);
    if (!user) return null;
    return {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at ?? null,
        user
    };
}
function createSupabaseAdapter(client) {
    return {
        async getCurrentUser (options) {
            const accessToken = options?.accessToken;
            const { data, error } = accessToken ? await client.auth.getUser(accessToken) : await client.auth.getUser();
            if (error) return null;
            return toAuthUser(data.user);
        },
        async getSession () {
            const { data, error } = await client.auth.getSession();
            if (error) return null;
            return toAuthSession(data.session);
        },
        onAuthStateChange (callback) {
            const { data } = client.auth.onAuthStateChange((event, session)=>{
                callback(event, toAuthSession(session));
            });
            return {
                unsubscribe: ()=>data.subscription.unsubscribe()
            };
        },
        async signOut () {
            await client.auth.signOut();
        }
    };
}
}),
"[project]/care-connect/packages/auth/src/server/index.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ACCESS_COOKIE",
    ()=>DEFAULT_ACCESS_COOKIE,
    "getAccessTokenFromRequest",
    ()=>getAccessTokenFromRequest,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getCurrentUserFromRequest",
    ()=>getCurrentUserFromRequest,
    "getSession",
    ()=>getSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/index.ts [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/supabase/src/server/index.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$auth$2f$src$2f$adapters$2f$supabase$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/auth/src/adapters/supabase.ts [middleware-edge] (ecmascript)");
;
;
const DEFAULT_ACCESS_COOKIE = "cc-access-token";
async function getCurrentUser(options) {
    const adapter = options?.adapter ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$auth$2f$src$2f$adapters$2f$supabase$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createSupabaseAdapter"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])());
    return adapter.getCurrentUser({
        accessToken: options?.accessToken
    });
}
async function getSession(options) {
    const accessToken = options?.accessToken;
    if (!accessToken) return null;
    const adapter = options?.adapter ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$auth$2f$src$2f$adapters$2f$supabase$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createSupabaseAdapter"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$supabase$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])());
    const user = await adapter.getCurrentUser({
        accessToken
    });
    if (!user) return null;
    return {
        accessToken,
        refreshToken: null,
        expiresAt: null,
        user
    };
}
function getAccessTokenFromRequest(req, cookieName = DEFAULT_ACCESS_COOKIE) {
    const authorization = readHeader(req.headers, "authorization");
    if (authorization?.startsWith("Bearer ")) {
        return authorization.slice("Bearer ".length).trim();
    }
    const cookieToken = readCookie(req.cookies, cookieName);
    return cookieToken;
}
async function getCurrentUserFromRequest(req, options) {
    const accessToken = getAccessTokenFromRequest(req, options?.cookieName);
    return getCurrentUser({
        accessToken,
        adapter: options?.adapter
    });
}
function readHeader(headers, name) {
    if (!headers) return undefined;
    if (typeof headers.get === "function") {
        return headers.get(name) ?? undefined;
    }
    const key = name.toLowerCase();
    const record = headers;
    const value = record[key];
    if (Array.isArray(value)) return value[0] ?? undefined;
    return value ?? undefined;
}
function readCookie(cookies, name) {
    if (!cookies) return undefined;
    if (typeof cookies.get === "function") {
        return cookies.get(name)?.value ?? undefined;
    }
    const record = cookies;
    return record[name] ?? undefined;
}
}),
"[project]/care-connect/apps/web/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/care-connect/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$auth$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/care-connect/packages/auth/src/server/index.ts [middleware-edge] (ecmascript)");
;
;
const PROTECTED_PREFIXES = [
    "/app"
];
const PUBLIC_PATHS = [
    "/",
    "/login",
    "/signup"
];
function isAssetPath(pathname) {
    return pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || pathname.startsWith("/robots.txt") || pathname.startsWith("/sitemap.xml");
}
function isProtectedPath(pathname) {
    if (PUBLIC_PATHS.includes(pathname)) return false;
    return PROTECTED_PREFIXES.some((prefix)=>pathname.startsWith(prefix));
}
async function middleware(req) {
    const { pathname } = req.nextUrl;
    if (isAssetPath(pathname) || !isProtectedPath(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$packages$2f$auth$2f$src$2f$server$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCurrentUserFromRequest"])(req);
    if (!user) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("auth", "required");
        return __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$care$2d$connect$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__ed2e4cd2._.js.map