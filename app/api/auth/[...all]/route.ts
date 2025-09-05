import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Wrap the POST handler to handle sign-out session errors gracefully
export async function POST(request: Request) {
  try {
    console.log("Auth API POST request:", {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries())
    });
    
    return await handler.POST(request);
  } catch (error: unknown) {
    console.error("Auth API POST error:", error);
    
    // If it's a sign-out request and session retrieval fails, treat as success
    if (request.url.includes('/sign-out') && 
        error instanceof Error &&
        (error.message?.includes('FAILED_TO_GET_SESSION') || 
         error.message?.includes('Failed to get session'))) {
      
      // Return success response and clear cookies
      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': [
            'better-auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax',
            'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax'
          ].join(', ')
        }
      });
      return response;
    }
    console.error("Auth API error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url
    });
    
    throw error;
  }
}

export const GET = handler.GET;

// Force API routes to run in Node.js runtime
export const runtime = 'nodejs';