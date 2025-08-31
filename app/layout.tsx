import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Tagesschrift font for Synapse branding
const tagesschrift = Geist({
  variable: "--font-tagesschrift",
  subsets: ["latin"],
  // Note: Using Geist as fallback since Tagesschrift may not be available in next/font/google
});

export const metadata: Metadata = {
  title: "Synapse",
  description: "A Next.js app with better-auth authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tagesschrift.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
