import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);

// Force API routes to run in Node.js runtime
export const runtime = 'nodejs';