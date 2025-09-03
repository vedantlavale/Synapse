import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
           (typeof window !== 'undefined' && window.location.origin.includes('vercel.app') ? 
            "https://synapse-sage.vercel.app" : 
            (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000")),
});
