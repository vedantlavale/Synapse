import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply middleware to specific routes to avoid build issues
  if (!["/dashboard", "/login", "/signup"].includes(pathname) && !pathname.startsWith("/dashboard/")) {
    return NextResponse.next();
  }
  
  // Check for Better Auth session cookie directly
  const sessionToken = request.cookies.get("better-auth.session_token");
  const token = sessionToken?.value;

  if (process.env.NODE_ENV === 'production') {
    console.log('Auth Middleware:', {
      path: pathname,
      hasToken: !!token,
      cookieHeaders: request.headers.get('cookie'),
      tokenValue: token ? token.substring(0, 10) + '...' : null,
      host: request.headers.get('host'),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      url: request.url
    });
  }
  
  if (token && ["/login", "/signup"].includes(pathname)) {
    console.log('Redirecting authenticated user to dashboard');
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (!token && (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))) {
    console.log('Redirecting unauthenticated user to login');
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
