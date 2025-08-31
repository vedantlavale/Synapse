import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { sharelink: string } }
) {
  try {
    const hash = params.sharelink; // get the hash from the params

    // Check if the hash exists in the Link table
    const link = await prisma.link.findFirst({
      where: {
        hash: hash,
      },
    });

    if (!link) {
      return NextResponse.json(
        { message: "Link not found" },
        { status: 404 }
      );
    }

    // If the link is found, get the userId from the link
    const userId = link.userId;

    // Get all the content of the userId with user details
    const content = await prisma.content.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Get the user details
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      username: user.name || user.email, // Use name if available, otherwise email
      content,
    });
  } catch (error: unknown) {
    console.error("Share link error:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared content" },
      { status: 500 }
    );
  }
}
