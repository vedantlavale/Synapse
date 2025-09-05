import { createAuthClient } from "better-auth/react";

// Get the base URL using the same logic as the server-side auth configuration
function getBaseURL() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});