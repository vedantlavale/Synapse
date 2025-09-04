import { createAuthClient } from "better-auth/react";

// Get the base URL using the same logic as the server-side auth configuration
function getBaseURL() {
  // If we have the environment variable, use it
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  
  // If we're in the browser
  if (typeof window !== 'undefined') {
    // Check if we're on Vercel deployment
    if (window.location.origin.includes('vercel.app')) {
      return "https://synapse-sage.vercel.app";
    }
    // Otherwise use the current origin
    return window.location.origin;
  }
  
  // Fallback for server-side rendering
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});