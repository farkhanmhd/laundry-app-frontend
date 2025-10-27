import { type NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

export async function proxy(request: NextRequest) {
  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        // Using request.headers is generally more reliable in middleware
        // as it's directly passed in.
        headers: request.headers,
      },
    });

    // Case 1: No session, and not on the login page -> redirect to login
    if (!session && request.nextUrl.pathname !== "/login") {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    // Case 2: Session exists, but user is on login or root page -> redirect to POS
    if (
      session &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/")
    ) {
      const posUrl = new URL("/pos", request.nextUrl.origin);
      return NextResponse.redirect(posUrl);
    }

    // If none of the above, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // This block now catches any fetch failure from getSession()
    console.error("Auth session fetch failed:", error);

    // IMPORTANT: Avoid a redirect loop. If the error happens while on the login page,
    // let the user stay there. Otherwise, redirect them.
    if (request.nextUrl.pathname !== "/login") {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("error", "authentication_service_unavailable");
      return NextResponse.redirect(loginUrl);
    }

    // Allow the login page to render even if the auth service is down
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
