import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile"];
  const authRoutes = ["/signin", "/signup"];
  
  const { pathname } = request.nextUrl;
  
  try {
    // Get session from the request
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (session && authRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is not authenticated and trying to access protected routes, redirect to signin
    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error checking the session, continue to the route
    // This prevents the app from breaking if auth service is down
    console.error("Middleware auth check failed:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
