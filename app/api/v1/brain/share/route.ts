import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
    const body = await req.json();
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
          link: `/share/${existingLink.hash}`,
        });
      }

      try {
        const hash = generateRandomHash(10);
        
        // Create or update the link using upsert
        const link = await prisma.link.upsert({
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
          link: `/share/${hash}`,
        });
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message },
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
      } catch (error: any) {
        // Handle case where link doesn't exist
        if (error.code === 'P2025') {
          return NextResponse.json({ 
            message: "No link found to remove" 
          });
        }
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}