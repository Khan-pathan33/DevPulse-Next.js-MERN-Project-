import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface EdgeSessionPayload {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  exp: number;
}

function parseSessionTokenEdge(token: string): EdgeSessionPayload | null {
  try {
    if (!token || !token.includes(".")) return null;
    const [jsonStr] = token.split(".");
    const base64 = jsonStr.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atob(padded);
    const payload = JSON.parse(json) as EdgeSessionPayload;
    if (Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const pathname = request.nextUrl.pathname;

  // Clone headers and add context instrumentation
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-devpulse-version", "2.1.0");
  requestHeaders.set("x-request-id", crypto.randomUUID());

  const sessionToken = request.cookies.get("devpulse_session")?.value;
  const user = sessionToken ? parseSessionTokenEdge(sessionToken) : null;

  // Route Guard: Protect /admin routes (Only Admins allowed)
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      loginUrl.searchParams.set("error", "auth_required");
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== "admin") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "admin_required");
      return NextResponse.redirect(loginUrl);
    }
  }

  // Route Guard: Protect /dashboard/new (Requires authentication)
  if (pathname.startsWith("/dashboard/new")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", "/dashboard/new");
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Attach execution timing header
  const duration = Date.now() - startTime;
  response.headers.set("x-response-time", `${duration}ms`);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
