import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for Better Auth session cookie directly
  // Better Auth typically uses this cookie name, but let's also check variations
  const sessionToken = request.cookies.get("better-auth.session_token") || 
                      request.cookies.get("session_token") ||
                      request.cookies.get("auth.session_token");
  
  if (sessionToken && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if (!sessionToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup"],
};

// Force middleware to run in Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';
