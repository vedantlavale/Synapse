import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Wrap the POST handler to handle sign-out session errors gracefully
export async function POST(request: Request) {
  try {
    return await handler.POST(request);
  } catch (error: any) {
    // If it's a sign-out request and session retrieval fails, treat as success
    if (request.url.includes('/sign-out') && 
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
    throw error;
  }
}

export const GET = handler.GET;

// Force API routes to run in Node.js runtime
export const runtime = 'nodejs';