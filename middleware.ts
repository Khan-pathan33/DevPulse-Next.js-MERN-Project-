import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const pathname = request.nextUrl.pathname;

  // Clone headers and add context instrumentation
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-devpulse-version", "2.0.0");
  requestHeaders.set("x-request-id", crypto.randomUUID());

  // Check demo auth cookie or header for /dashboard/new if desired
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
