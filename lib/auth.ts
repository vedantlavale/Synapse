import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import {Resend} from "resend"
import EmailVerification from "@/components/emails/Verifyemails";

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
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
        // Add callback URL configuration
        autoSignInAfterVerification: false, // Don't auto sign in
        callbackURL: "/verify-email", // Redirect to our verification page
    },
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET ?? "fallback-secret-for-build",
  baseURL: process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === 'production' ? "https://synapse-sage.vercel.app" : "http://localhost:3000"),
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
    "https://synapse-sage.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
});