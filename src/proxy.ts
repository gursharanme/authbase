import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  DEFAULT_AUTHENTICATED_REDIRECT,
  LOGIN_ROUTE,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/config/auth";

function matchesRoute(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const session = getSessionCookie(request);

  const isPublic = matchesRoute(pathname, PUBLIC_ROUTES);
  const isPrivate = matchesRoute(pathname, PRIVATE_ROUTES);

  // Public routes
  if (isPublic) {
    if (session && pathname !== "/") {
      return NextResponse.redirect(
        new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url),
      );
    }

    return NextResponse.next();
  }

  // Private routes
  if (isPrivate && !session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const loginUrl = new URL(LOGIN_ROUTE, request.url);

    loginUrl.searchParams.set("callbackUrl", pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|api/webhooks|_next|.*\\..*).*)"],
};
