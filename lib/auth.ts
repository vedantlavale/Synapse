import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import {Resend} from "resend"
import EmailVerification from "@/components/emails/Verifyemails";

const resend = new Resend(process.env.RESEND_API_KEY)

// Get the base URL for better-auth configuration
function getBaseURL() {
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
}

export const auth = betterAuth({
    cookies: {
        cookieName: "better-auth.session_token",
        cookieOptions: {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: "no-reply@vedant.works",
                to: user.email,
                subject: "Verify your email address",
                react:EmailVerification({userEmail: user.email, userEmailVerificationLink: url})
            });
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        callbackURL: "/dashboard",
    },
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  secret: process.env.BETTER_AUTH_SECRET ?? "fallback-secret-for-build",
  baseURL: getBaseURL(),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 3,
    maxPasswordLength: 16,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://brainly.vedant.works",
    ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL ? [process.env.NEXT_PUBLIC_BETTER_AUTH_URL] : []),
  ],
});