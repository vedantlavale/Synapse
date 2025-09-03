import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Function to generate random hash
function generateRandomHash(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    // Get session using better-auth (equivalent to userMiddleware)
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // Add content type check and handle empty body
    let body;
    try {
      const text = await req.text();
      if (!text) {
        body = {}; // Default to empty object if no body
      } else {
        body = JSON.parse(text);
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { share } = body;

    if (share) {
      // Check if link already exists for this user
      const existingLink = await prisma.link.findUnique({
        where: {
          userId: userId,
        },
      });

      if (existingLink) {
        return NextResponse.json({
          message: "Link already exists",
          link: `/brain/share/${existingLink.hash}`,
        });
      }

      try {
        const hash = generateRandomHash(10);
        
        // Create or update the link using upsert
        await prisma.link.upsert({
          where: {
            userId: userId,
          },
          update: {
            hash: hash,
          },
          create: {
            hash: hash,
            userId: userId,
          },
        });

        return NextResponse.json({
          message: "Link created or updated successfully",
          link: `/brain/share/${hash}`,
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    } else {
      try {
        // If share is false, delete the link for the user
        await prisma.link.delete({
          where: {
            userId: userId,
          },
        });

        return NextResponse.json({ 
          message: "Link removed successfully" 
        });
      } catch (error: unknown) {
        // Handle case where link doesn't exist
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
          return NextResponse.json({ 
            message: "No link found to remove" 
          });
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}