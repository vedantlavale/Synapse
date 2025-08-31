import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply middleware to specific routes to avoid build issues
  if (!["/dashboard", "/login", "/signup"].includes(pathname) && !pathname.startsWith("/dashboard/")) {
    return NextResponse.next();
  }
  
  // Check for Better Auth session cookie directly
  const sessionToken = request.cookies.get("better-auth.session_token") || 
                      request.cookies.get("session_token") ||
                      request.cookies.get("auth.session_token");
  
  if (sessionToken && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (!sessionToken && (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
