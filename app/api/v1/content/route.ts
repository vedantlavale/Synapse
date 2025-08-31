import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    // Fetch content for the user with user details (equivalent to populate)
    const content = await prisma.content.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true, // Using 'name' field as it's the closest to 'username' in your schema
            email: true, // You can include email if needed
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json({
      content,
    });
  } catch (error) {
    console.error("Content fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("=== POST /api/v1/content ===");
    console.log("Headers:", Object.fromEntries(req.headers.entries()));
    console.log("Cookies:", req.cookies.getAll());
    console.log("Authorization header:", req.headers.get('authorization'));
    console.log("Cookie header:", req.headers.get('cookie'));
    
    // Get session using better-auth (equivalent to userMiddleware)
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    console.log("Session result:", session);

    if (!session) {
      console.error("Authentication failed: No session found");
      console.log("Available headers for debugging:", {
        authorization: req.headers.get('authorization'),
        cookie: req.headers.get('cookie'),
        'x-session-token': req.headers.get('x-session-token'),
        'x-auth-token': req.headers.get('x-auth-token'),
      });
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    const link = body.link;
    const type = body.type;
    const description = body.description;
    const title = body.title;

    await prisma.content.create({
      data: {
        title,
        link,
        type,
        description,
        userId: session.user.id,
        // tags: [], // Note: In Prisma, we don't need to explicitly set empty relations
      },
    });

    return NextResponse.json({ message: "Content Added" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
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

    // Get content ID from URL search params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    // Delete content for the user
    const deletedContent = await prisma.content.deleteMany({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (deletedContent.count === 0) {
      return NextResponse.json(
        { error: "Content not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Content Deleted" });
  } catch (error) {
    console.error("Content delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
